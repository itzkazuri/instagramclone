import { Heart, MessageCircle } from 'lucide-react';

interface PhotoItemProps {
  mediaUrl: string;
  likes: number;
  comments: number;
}

export const PhotoItem = ({ mediaUrl, likes, comments }: PhotoItemProps) => {
  return (
    <div className="relative group aspect-square overflow-hidden">
      <img src={mediaUrl} alt="Post" className="w-full h-full object-cover" />
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
