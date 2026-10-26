'use client';
import dynamic from 'next/dynamic';
import { createContext, useContext, useState } from 'react';
import { useMotion } from './motion-provider';
import { scrollToPosition } from '@/lib/navigation';
import type { Detail } from '@/lib/types';
const DetailDialog = dynamic(() => import('./detail-dialog'));
const ServiceDialog = dynamic(() => import('./service-dialog'));
interface DialogState { open: (detail: Detail) => void; service: string; setService: (value: string) => void }
const DialogContext = createContext<DialogState>({ open: () => {}, service: '', setService: () => {} });
export function DialogProvider({ children }: { children: React.ReactNode }) {
  const { reduced } = useMotion();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [service, setService] = useState('');
  const onQuote = () => {
    if (!detail) return;
    setService(detail.category); setDetail(null);
    requestAnimationFrame(() => {
      const target = document.getElementById('contacto');
      if (target) scrollToPosition(target.getBoundingClientRect().top + scrollY - 88, reduced, () => document.getElementById('nombre')?.focus({ preventScroll: true }));
    });
  };
  return <DialogContext value={{ open: setDetail, service, setService }}>
    {children}
    {detail && ('includes' in detail && typeof detail.includes === 'string'
      ? <ServiceDialog key={detail.title} detail={detail} includes={detail.includes} onClose={() => setDetail(null)} onQuote={onQuote} />
      : <DetailDialog key={detail.title} detail={detail} onClose={() => setDetail(null)} onQuote={onQuote} />)}
  </DialogContext>;
}
export const useDialog = () => useContext(DialogContext);
