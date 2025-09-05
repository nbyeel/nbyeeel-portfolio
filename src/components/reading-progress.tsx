'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-75 ease-linear"
        style={{ 
          transform: `translateX(${progress - 100}%)`,
          willChange: 'transform'
        }}
      />
    </div>
  );
}
