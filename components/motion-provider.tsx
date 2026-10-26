'use client';
import { createContext, useContext, useMemo, useState, useSyncExternalStore } from 'react';
const subscribe = (callback: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const snapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverSnapshot = () => true;
const MotionContext = createContext({ reduced: true, paused: false, systemReduced: true, toggle: () => {} });
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemReduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  const value = useMemo(() => ({ reduced: systemReduced || paused, systemReduced, paused, toggle: () => setPaused(p => !p) }), [systemReduced, paused]);
  return <MotionContext value={value}>{children}</MotionContext>;
}
export const useMotion = () => useContext(MotionContext);
export function MotionToggle() {
  const motion = useMotion();
  return <button type="button" className="motion-toggle" onClick={motion.toggle} aria-pressed={motion.paused} hidden={motion.systemReduced}>{motion.paused ? 'Reanudar animaciones' : 'Pausar animaciones'}</button>;
}
