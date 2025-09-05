'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

export default function BlogShare() {
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    if (!shareUrl) return;

    const title = document.title;
    const text = 'Check out this article: ';

    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + title)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  if (!shareUrl) {
    return (
      <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400">
        <div className="w-3 h-3 border border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center justify-center w-10 h-10 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
        aria-label="Share on Twitter"
      >
        <MessageCircle className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="flex items-center justify-center w-10 h-10 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
        aria-label="Share on LinkedIn"
      >
        <ExternalLink className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
      </button>
    </div>
  );
}
