/**
 * Centralized Analytics Utility
 * Safe, privacy-first event tracking.
 * Only sends events if NEXT_PUBLIC_GA_ID is defined and valid.
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const isAnalyticsEnabled = Boolean(
  GA_TRACKING_ID &&
    GA_TRACKING_ID.startsWith('G-') &&
    !GA_TRACKING_ID.includes('XXXX')
);

export type AnalyticsEventName =
  | 'quiz_started'
  | 'question_answered'
  | 'quiz_completed'
  | 'quiz_shared'
  | 'quiz_restarted'
  | 'category_opened'
  | 'search_used';

export function trackEvent(
  action: AnalyticsEventName,
  params: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined') return;

  if (isAnalyticsEnabled && typeof window.gtag === 'function') {
    try {
      window.gtag('event', action, params);
    } catch (err) {
      console.warn('Analytics event dispatch failed:', err);
    }
  } else if (process.env.NODE_ENV === 'development') {
    // Helpful log in development without leaking or cluttering
    console.debug(`[Analytics Event] ${action}:`, params);
  }
}
