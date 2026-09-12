'use client';

import { useEffect, useRef } from 'react';
import { adsConfig } from '@/config/ads';
import { cn } from '@/lib/utils';

export type AdSlotType = 'homeTop' | 'quizTop' | 'resultBottom' | 'sidebar' | 'inContent';

interface AdSlotProps {
  type: AdSlotType;
  slotId?: string;
  className?: string;
}

export default function AdSlot({ type, slotId, className }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  // Map type to slot ID if not provided explicitly
  const resolvedSlotId =
    slotId ||
    (type === 'homeTop'
      ? adsConfig.slots.homeTop
      : type === 'quizTop'
      ? adsConfig.slots.quizTop
      : type === 'resultBottom'
      ? adsConfig.slots.resultBottom
      : type === 'sidebar'
      ? adsConfig.slots.sidebar
      : '');

  useEffect(() => {
    if (adsConfig.enabled && resolvedSlotId && typeof window !== 'undefined') {
      try {
        // Safe Google AdSense push
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense push error:', e);
      }
    }
  }, [resolvedSlotId]);

  // If real AdSense is enabled and slot ID is configured, render real ad unit
  if (adsConfig.enabled && resolvedSlotId) {
    return (
      <div
        ref={adRef}
        className={cn(
          'w-full my-6 flex flex-col items-center justify-center overflow-hidden',
          className
        )}
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
          Advertisement
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsConfig.clientId}
          data-ad-slot={resolvedSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // If placeholder mode is enabled (in development or before live publisher ID approval)
  if (adsConfig.showPlaceholderInDev) {
    const minHeightClass =
      type === 'sidebar'
        ? 'min-h-[250px]'
        : type === 'homeTop'
        ? 'min-h-[90px]'
        : 'min-h-[100px]';

    return (
      <div
        className={cn(
          'w-full my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700/60 bg-slate-900/30 p-4 transition-colors',
          minHeightClass,
          className
        )}
        role="region"
        aria-label="Advertisement placeholder"
      >
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Advertisement Slot
        </span>
        <span className="text-xs text-slate-600 mt-1">
          {type} unit &bull; Configured via ads.ts
        </span>
      </div>
    );
  }

  return null;
}
