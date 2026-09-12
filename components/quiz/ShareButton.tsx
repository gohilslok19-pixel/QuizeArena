'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import Button from '@/ui/Button';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

interface ShareButtonProps {
  quizTitle: string;
  quizSlug: string;
  score: number;
  total: number;
}

export default function ShareButton({
  quizTitle,
  quizSlug,
  score,
  total,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/quiz/${quizSlug}`
    : `${siteConfig.url}/quiz/${quizSlug}`;

  const shareText = `I scored ${score}/${total} on ${quizTitle} on AI Quiz Arena! Can you beat my score? Check it out:`;

  const handleShare = async () => {
    trackEvent('quiz_shared', { quiz_slug: quizSlug, score });

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Score on ${quizTitle} – AI Quiz Arena`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share API threw; fall back to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = `${shareText} ${shareUrl}`;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <Button
      variant="outline"
      size="md"
      onClick={handleShare}
      className="relative gap-2"
      aria-label="Share your score"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-purple-400" />
          <span>Share My Score</span>
        </>
      )}
    </Button>
  );
}
