/**
 * Centralized Google AdSense configuration.
 *
 * To enable real Google AdSense ads:
 * 1. Obtain an approved AdSense Publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)
 * 2. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in your environment (.env.local / Vercel dashboard)
 * 3. Create display ad units in your AdSense console and provide the slot IDs
 *
 * If clientId is unset or set to placeholder, the AdSlot component falls back to
 * a clean, non-intrusive development placeholder box that automatically prevents layout shift.
 */

const rawClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const isRealClientId = Boolean(
  rawClientId &&
    rawClientId.startsWith('ca-pub-') &&
    !rawClientId.includes('XXXX')
);

export const adsConfig = {
  enabled: isRealClientId,
  clientId: isRealClientId ? rawClientId : '',
  slots: {
    homeTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || '',
    quizTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_QUIZ || '',
    resultBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT || '',
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
  },
  showPlaceholderInDev: true,
};
