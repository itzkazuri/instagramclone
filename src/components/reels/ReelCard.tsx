'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Reel } from '@/lib/dummy-data';
import { VideoPlayer } from './VideoPlayer';
import { VideoInfo } from './VideoInfo';
import { ActionButtons } from './ActionButtons';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
  onLoadedData?: () => void;
}

export function ReelCard({ reel, isActive, onLoadedData }: ReelCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Format count numbers
  const formatCount = useCallback((count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }, []);

  // Handle video loading
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    onLoadedData?.();
  }, [onLoadedData]);

  // Handle video error
  const handleVideoError = useCallback(() => {
    setIsVideoLoaded(false);
  }, []);

  // Handle play/pause functionality
  const handlePlayPause = useCallback(async () => {
    if (!videoRef.current || !isVideoLoaded) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn('Video play/pause error:', error);
    }
  }, [isPlaying, isVideoLoaded]);

  // Cleanup function to ensure video is paused when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // Interaction handlers
  const handleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  }, [isLiked]);

  const handleBookmark = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(prev => !prev);
  }, []);

  const handleFollow = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(prev => !prev);
  }, []);

  const handleShare = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle share functionality
  }, []);

  const handleComment = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle comment functionality
  }, []);

  return (
    <div className="relative w-full h-screen snap-start bg-black overflow-hidden">
      <VideoPlayer
        src={reel.videoUrl}
        isActive={isActive}
        isPlaying={isPlaying}
        isVideoLoaded={isVideoLoaded}
        onPlayPause={handlePlayPause}
        onVideoLoad={handleVideoLoad}
        onVideoError={handleVideoError}
      />
      
      <VideoInfo
        reel={reel}
        isFollowing={isFollowing}
        onFollow={handleFollow}
      />
      
      <ActionButtons
        reel={reel}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        isFollowing={isFollowing}
        likeCount={likeCount}
        isPlaying={isPlaying}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        onBookmark={handleBookmark}
        onFollow={handleFollow}
        formatCount={formatCount}
      />
      
      {/* Link overlay for navigation - positioned at the top */}
      <Link 
        href={`/reels/${reel.id}`} 
        className="absolute top-0 left-0 right-0 h-16 z-10"
        aria-label={`View reel by ${reel.user.name}`}
      ></Link>
    </div>
  );
}