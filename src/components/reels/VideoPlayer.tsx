'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
  isPlaying: boolean;
  isVideoLoaded: boolean;
  onPlayPause: () => void;
  onVideoLoad: () => void;
  onVideoError: () => void;
  shouldLoad?: boolean;
}

export function VideoPlayer({ 
  src, 
  isActive, 
  isPlaying, 
  isVideoLoaded, 
  onPlayPause, 
  onVideoLoad, 
  onVideoError,
  shouldLoad = true
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play/pause based on active state
  useEffect(() => {
    if (!videoRef.current || !isVideoLoaded || !shouldLoad) return;

    const video = videoRef.current;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.warn('Auto-play prevented:', error);
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, isVideoLoaded, shouldLoad]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!videoRef.current || !isVideoLoaded || !shouldLoad) return;

      if (document.hidden) {
        videoRef.current.pause();
      } else if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise) {
          playPromise.catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, isVideoLoaded, shouldLoad]);

  // Reset video when shouldLoad changes to false
  useEffect(() => {
    if (!shouldLoad && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [shouldLoad]);

  if (!shouldLoad) {
    return (
      <div 
        className="relative w-full h-full flex items-center justify-center cursor-pointer bg-gray-900"
        onClick={onPlayPause}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onClick={onPlayPause}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={onVideoLoad}
        onError={onVideoError}
      />
      
      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Play Button Overlay */}
      {isVideoLoaded && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button 
            size="icon" 
            className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onPlayPause();
            }}
          >
            <Play className="w-7 h-7 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}