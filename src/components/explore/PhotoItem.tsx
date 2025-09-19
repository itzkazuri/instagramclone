'use client';

import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Copy } from 'lucide-react';
import { Post } from '@/types';

interface PhotoItemProps {
  post: Post;
  onClick: () => void;
}

export const PhotoItem = ({ post, onClick }: PhotoItemProps) => {
  const firstMedia = post.media[0];
  const isMultiMedia = post.media.length > 1;

  const [likes, setLikes] = useState(post.likesCount.toString());
  const [comments, setComments] = useState(post.commentsCount.toString());

  useEffect(() => {
    setLikes(post.likesCount.toLocaleString());
    setComments(post.commentsCount.toLocaleString());
  }, [post.likesCount, post.commentsCount]);

  return (
    <div className="relative group aspect-square overflow-hidden cursor-pointer" onClick={onClick}>
      <img 
        src={firstMedia.url} 
        alt={firstMedia.altText} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      {isMultiMedia && (
        <Copy className="absolute top-2 right-2 text-white h-5 w-5" />
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-4 text-white font-bold">
          <div className="flex items-center">
            <Heart className="h-6 w-6 mr-1" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-6 w-6 mr-1" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

