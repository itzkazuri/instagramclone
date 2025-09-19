import { Post } from "@/lib/dummy-data";
import { PhotoItem } from './PhotoItem';

interface ProfilePostGridProps {
  posts: Post[];
}

export const ProfilePostGrid = ({ posts }: ProfilePostGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <PhotoItem
          key={post.id}
          mediaUrl={post.mediaUrl}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};
