"use client";

import { useState, useEffect } from "react";
import { ReelCard } from "./ReelCard";

interface ReelItemProps {
  reel: any;
  isActive: boolean;
  onCommentClick?: () => void;
  shouldLoad: boolean;
}

export function ReelItem({ reel, isActive, onCommentClick, shouldLoad }: ReelItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      setIsLoaded(true);
    }
  }, [shouldLoad, isLoaded]);

  return (
    <ReelCard
      reel={reel}
      isActive={isActive}
      onCommentClick={onCommentClick}
      shouldLoad={isLoaded}
    />
  );
}