import { PhotoItem } from './PhotoItem';
import { Post } from '@/types';

interface PhotoGridProps {
  posts: Post[];
  onPhotoClick: (post: Post) => void;
}

export const PhotoGrid = ({ posts, onPhotoClick }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {posts.map((post) => (
        <PhotoItem
          key={post.id}
          post={post}
          onClick={() => onPhotoClick(post)}
        />
      ))}
    </div>
  );
};
