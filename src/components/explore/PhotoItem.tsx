'use client';

import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Copy } from 'lucide-react';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';

interface PhotoItemProps {
  post: Post;
  onClick: () => void;
}

export const PhotoItem = ({ post, onClick }: PhotoItemProps) => {
  const firstMedia = post.media[0];
  const isMultiMedia = post.media.length > 1;
  const router = useRouter();

  const [likes, setLikes] = useState(post.likesCount.toString());
  const [comments, setComments] = useState(post.commentsCount.toString());

  useEffect(() => {
    setLikes(post.likesCount.toLocaleString());
    setComments(post.commentsCount.toLocaleString());
  }, [post.likesCount, post.commentsCount]);

  const handleClick = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Navigate to the post page
      router.push(`/explore/post/${post.id}`);
    } else {
      // Use the onClick handler for desktop (modal)
      onClick();
    }
  };

  return (
    <div className="relative group aspect-square overflow-hidden cursor-pointer" onClick={handleClick}>
      <img 
        src={firstMedia.url} 
        alt={firstMedia.altText} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        onError={(e) => {
          // Fallback image if the original fails to load
          const target = e.target as HTMLImageElement;
          target.src = "/placeholder.svg";
        }}
      />
      {isMultiMedia && (
        <Copy className="absolute top-1 md:top-2 right-1 md:right-2 text-white h-3 w-3 md:h-5 md:w-5" />
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-2 md:space-x-4 text-white font-bold">
          <div className="flex items-center">
            <Heart className="h-4 w-4 md:h-6 md:w-6 mr-1" />
            <span className="text-xs md:text-base">{likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 md:h-6 md:w-6 mr-1" />
            <span className="text-xs md:text-base">{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

