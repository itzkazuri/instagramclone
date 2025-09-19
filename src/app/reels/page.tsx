'use client';

import { useState, useRef, useEffect } from 'react';
import { ReelCard } from '@/components/reels/ReelCard';
import { DUMMY_REELS } from '@/lib/dummy-data';

export default function ReelsPage() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      
      if (e.key === 'ArrowUp' && currentReelIndex > 0) {
        isScrolling.current = true;
        setCurrentReelIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentReelIndex < DUMMY_REELS.length - 1) {
        isScrolling.current = true;
        setCurrentReelIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentReelIndex]);

  // Handle touch swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartY.current || isScrolling.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY.current - touchEndY;
    
    // Minimum swipe distance
    if (Math.abs(diffY) > 50) {
      if (diffY > 0 && currentReelIndex < DUMMY_REELS.length - 1) {
        // Swipe up - next reel
        isScrolling.current = true;
        setCurrentReelIndex(prev => prev + 1);
      } else if (diffY < 0 && currentReelIndex > 0) {
        // Swipe down - previous reel
        isScrolling.current = true;
        setCurrentReelIndex(prev => prev - 1);
      }
    }
    
    touchStartY.current = 0;
  };

  // Handle manual scrolling
  const handleScroll = () => {
    if (!containerRef.current || isScrolling.current) return;
    
    // Throttle scroll events
    const now = Date.now();
    if (now - lastScrollTime.current < 100) return;
    lastScrollTime.current = now;
    
    const container = containerRef.current;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    
    // Calculate which reel is most visible
    const reelHeight = clientHeight;
    const reelIndex = Math.round(scrollTop / reelHeight);
    
    if (reelIndex !== currentReelIndex && reelIndex >= 0 && reelIndex < DUMMY_REELS.length) {
      setCurrentReelIndex(reelIndex);
    }
  };

  // Reset scrolling flag after transition
  useEffect(() => {
    if (isScrolling.current) {
      const timer = setTimeout(() => {
        isScrolling.current = false;
      }, 500); // Match the scroll transition duration
      
      return () => clearTimeout(timer);
    }
  }, [currentReelIndex]);

  // Scroll to current reel when navigating programmatically
  useEffect(() => {
    if (isScrolling.current && containerRef.current) {
      const container = containerRef.current;
      const targetScrollTop = currentReelIndex * container.clientHeight;
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [currentReelIndex]);

  return (
    <div className="flex h-screen w-full bg-black">
      <div 
        ref={containerRef}
        className="flex flex-col h-full w-full overflow-y-auto snap-y snap-mandatory"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        {DUMMY_REELS.map((reel, index) => (
          <div 
            key={reel.id} 
            className="h-screen w-full snap-start"
          >
            <ReelCard 
              reel={reel}
              isActive={index === currentReelIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}