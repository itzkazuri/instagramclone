'use client';

import { useRef, useState } from "react";
import { Media } from "@/types";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PostMediaProps {
  media: Media[];
  currentMediaIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export function PostMedia({ media, currentMediaIndex, onNext, onPrev }: PostMediaProps) {
  if (!media || media.length === 0 || !media[currentMediaIndex]) {
    return (
      <div className="flex-1 bg-black relative flex items-center justify-center">
        <Skeleton className="w-full h-[600px]" />
      </div>
    );
  }

  const currentMedia = media[currentMediaIndex];
  const isVideo = currentMedia?.type === "VIDEO";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Handle swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchMoveX = moveEvent.touches[0].clientX;
      const diff = touchStartX - touchMoveX;
      
      // Minimum swipe distance
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          onNext(); // Swipe left
        } else {
          onPrev(); // Swipe right
        }
        
        // Remove event listeners after swipe
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      className="flex-1 bg-black relative flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
    >
      {/* Media Navigation */}
      {media.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-1.5 md:p-2"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 md:right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-1.5 md:p-2"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </>
      )}

      {/* Media Content */}
      {isVideo ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src={currentMedia.url}
            className="max-w-full max-h-full object-contain"
            muted={isVideoMuted}
            loop
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onClick={toggleVideoPlay}
          />
          <div className="absolute bottom-2 left-2 flex space-x-1">
            <button
              onClick={toggleVideoPlay}
              className="text-white bg-black bg-opacity-50 rounded-full p-1.5 hover:bg-opacity-70 transition-all"
            >
              {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={toggleVideoMute}
              className="text-white bg-black bg-opacity-50 rounded-full p-1.5 hover:bg-opacity-70 transition-all"
            >
              {isVideoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      ) : (
        <img
          src={currentMedia.url || "/placeholder.svg"}
          alt={currentMedia.altText}
          className="max-w-full max-h-full object-contain"
        />
      )}

      {/* Media Indicators */}
      {media.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {media.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentMediaIndex ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}