import { useState, useEffect, useRef, useCallback } from "react";
import { Comment } from "@/types";
import { generateDummyComments } from "@/lib/generateDummyComments";
import { Reel } from "@/lib/dummy-data";

interface UseReelsProps {
  shuffledReels: Reel[];
}

export const useReels = ({ shuffledReels }: UseReelsProps) => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;

      if (e.key === "ArrowUp" && currentReelIndex > 0) {
        isScrolling.current = true;
        setCurrentReelIndex((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        currentReelIndex < shuffledReels.length - 1
      ) {
        isScrolling.current = true;
        setCurrentReelIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentReelIndex, shuffledReels.length]);

  // Handle touch swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartY.current || isScrolling.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY.current - touchEndY;

    // Minimum swipe distance
    if (Math.abs(diffY) > 50) {
      if (diffY > 0 && currentReelIndex < shuffledReels.length - 1) {
        // Swipe up - next reel
        isScrolling.current = true;
        setCurrentReelIndex((prev) => prev + 1);
      } else if (diffY < 0 && currentReelIndex > 0) {
        // Swipe down - previous reel
        isScrolling.current = true;
        setCurrentReelIndex((prev) => prev - 1);
      }
    }

    touchStartY.current = 0;
  }, [currentReelIndex, shuffledReels.length]);

  // Handle manual scrolling
  const handleScroll = useCallback(() => {
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

    if (
      reelIndex !== currentReelIndex &&
      reelIndex >= 0 &&
      reelIndex < shuffledReels.length
    ) {
      setCurrentReelIndex(reelIndex);
    }
  }, [currentReelIndex, shuffledReels.length]);

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
        behavior: "smooth",
      });
    }
  }, [currentReelIndex]);

  // Generate comments when a reel is selected
  useEffect(() => {
    // Generate a random number of comments for the current reel
    const commentCount = Math.floor(Math.random() * 20) + 5;
    setComments(generateDummyComments(commentCount));
  }, [currentReelIndex]);

  const handleAddComment = useCallback((content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: "current-user",
        username: "current_user",
        cosplayerName: "Current User",
        avatar: "/current-user-avatar.png",
        isVerified: false,
      },
      content,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false,
    };

    setComments((prev) => [newComment, ...prev]);
  }, []);

  return {
    currentReelIndex,
    setCurrentReelIndex,
    comments,
    setComments,
    containerRef,
    handleTouchStart,
    handleTouchEnd,
    handleScroll,
    handleAddComment,
  };
};