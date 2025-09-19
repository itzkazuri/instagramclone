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

  return (
    <div className="flex-1 bg-black relative flex items-center justify-center">
      {/* Media Navigation */}
      {media.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Media Content */}
      {isVideo ? (
        <div className="relative max-w-full max-h-full">
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
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button
              onClick={toggleVideoPlay}
              className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={toggleVideoMute}
              className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              {isVideoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {media.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === currentMediaIndex ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}