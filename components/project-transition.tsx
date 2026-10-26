'use client';
import { useEffect, useRef } from 'react';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer } from 'three';
import type { Orientation } from '@/lib/types';
export default function ProjectTransition({ transitionKey, format }: { transitionKey: number; format: Orientation }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const draw = useRef<(() => void) | null>(null);
  const previous = useRef(format);
  useEffect(() => {
    const element = canvas.current!;
    let renderer: WebGLRenderer;
    try { renderer = new WebGLRenderer({ canvas: element, alpha: true, antialias: false, powerPreference: 'low-power' }); }
    catch { element.dataset.webgl = 'fallback'; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const scene = new Scene(), camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ transparent: true, depthTest: false, uniforms: { progress: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=position.xy*.5+.5; gl_Position=vec4(position.xy,0.,1.); }',
      fragmentShader: 'precision mediump float; varying vec2 vUv; uniform float progress; void main(){ float shutter=smoothstep(.12,.5,abs(vUv.y-.5)); float alpha=sin(progress*3.14159265)*shutter*.25; gl_FragColor=vec4(vec3(.005),alpha); }'
    });
    scene.add(new Mesh(geometry, material));
    let frame = 0;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; renderer.clear(); element.dataset.active = 'false'; };
    const resize = new ResizeObserver(() => { renderer.setSize(element.clientWidth, element.clientHeight, false); });
    resize.observe(element);
    element.dataset.webgl = 'ready';
    draw.current = () => {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
      stop(); const start = performance.now(); element.dataset.active = 'true';
      const render = (now: number) => {
        const progress = Math.min(1, (now - start) / 460);
        material.uniforms.progress.value = progress;
        renderer.render(scene, camera);
        if (progress < 1 && !document.hidden) frame = requestAnimationFrame(render); else stop();
      };
      frame = requestAnimationFrame(render);
    };
    const lost = () => { cancelAnimationFrame(frame); element.dataset.active = 'false'; element.dataset.webgl = 'fallback'; };
    const restored = () => { element.dataset.webgl = 'ready'; };
    const visibility = () => { if (document.hidden) stop(); };
    element.addEventListener('webglcontextlost', lost); element.addEventListener('webglcontextrestored', restored);
    document.addEventListener('visibilitychange', visibility);
    return () => { draw.current = null; stop(); resize.disconnect(); element.removeEventListener('webglcontextlost', lost); element.removeEventListener('webglcontextrestored', restored); document.removeEventListener('visibilitychange', visibility); geometry.dispose(); material.dispose(); renderer.dispose(); };
  }, []);
  useEffect(() => { if (previous.current !== format) draw.current?.(); previous.current = format; }, [transitionKey, format]);
  return <canvas ref={canvas} className="project-transition" aria-hidden="true" />;
}
