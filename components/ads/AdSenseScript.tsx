'use client';

import Script from 'next/script';
import { adsConfig } from '@/config/ads';

export default function AdSenseScript() {
  if (!adsConfig.enabled || !adsConfig.clientId) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      src={`https://page2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.clientId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
