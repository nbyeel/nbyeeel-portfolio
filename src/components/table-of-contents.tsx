'use client';

import { useState, useEffect } from 'react';


interface TableOfContentsProps {
  content: any[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const items: TocItem[] = [];
    content?.forEach((block) => {
      if (block._type === 'block' && block.style && ['h2', 'h3', 'h4'].includes(block.style)) {
        const text = block.children?.map((child: any) => child.text).join('') || '';
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Treat all H3 headings as H2 for consistent alignment
        let level = parseInt(block.style.charAt(1));
        if (level === 3) {
          level = 2;
        }
        
        // Skip the "Pros of having your own website" line
        if (text.toLowerCase().includes('pros of having your own website')) {
          return;
        }
        
        items.push({
          id,
          text,
          level
        });
      }
    });
    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // Observe all heading elements
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-2">
      {tocItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToHeading(item.id)}
          className={`group relative block w-full text-left py-3 px-4 rounded-lg text-sm transition-all duration-300 ${
            activeId === item.id
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 hover:shadow-md'
          }`}
          style={{ 
            paddingLeft: item.level === 2 ? '0px' : item.level === 3 ? '16px' : '32px'
          }}
        >
          <span className="relative z-10">{item.text}</span>
          {activeId !== item.id && (
            <div className="absolute top-1 bottom-1 left-1 right-1 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </button>
      ))}
    </nav>
  );
}
