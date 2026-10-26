'use client';
import { useEffect, useRef } from 'react';
import type { JSAnimation } from 'animejs';
import { useMotion } from './motion-provider';
export function MicroButton({ children, className = 'button', onClick, label, disabled = false }: { children: React.ReactNode; className?: string; onClick?: () => void; label?: string; disabled?: boolean }) {
  const icon = useRef<HTMLSpanElement>(null);
  const animation = useRef<JSAnimation | null>(null);
  const { reduced } = useMotion();
  useEffect(() => () => { animation.current?.revert(); }, []);
  const respond = async () => {
    if (reduced || disabled) return;
    const { animate } = await import('animejs');
    if (!icon.current?.isConnected) return;
    animation.current?.revert();
    animation.current = animate(icon.current, { x: [0, 3, 0], duration: 320, ease: 'out(2)' });
  };
  return <button type="button" className={className} onClick={onClick} onPointerEnter={respond} onFocus={respond} aria-label={label} disabled={disabled}>{children}<span ref={icon} aria-hidden="true">↗</span></button>;
}
