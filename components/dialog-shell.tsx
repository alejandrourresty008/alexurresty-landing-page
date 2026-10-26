'use client';
import { useEffect, useRef } from 'react';
import type { KeyboardEventHandler, MouseEvent, PointerEvent, ReactNode } from 'react';
export function DialogShell({ children, onClose, labelledBy, className, closeLabel, onKeyDown }: {
  children: ReactNode; onClose: () => void; labelledBy: string; className: string; closeLabel: string; onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const beganOnBackdrop = useRef(false);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    element?.showModal(); document.body.style.overflow = 'hidden';
    return () => {
      element?.querySelectorAll('video').forEach(video => video.pause());
      element?.close(); document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  const outside = (event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>) => {
    const element = dialog.current;
    if (!element || event.target !== element) return false;
    const bounds = element.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  return <dialog ref={dialog} aria-labelledby={labelledBy} className={className}
    onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={onKeyDown}
    onPointerDown={event => { beganOnBackdrop.current = outside(event); }}
    onPointerCancel={() => { beganOnBackdrop.current = false; }}
    onClick={event => { if (beganOnBackdrop.current && outside(event)) onClose(); beganOnBackdrop.current = false; }}>
    <button type="button" className="dialog-close" onClick={onClose} aria-label={closeLabel}>×</button>
    {children}
  </dialog>;
}
