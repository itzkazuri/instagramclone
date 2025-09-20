import { useState, useEffect, useRef } from 'react';
import { LazyPhotoItem } from './LazyPhotoItem';
import { Post } from '@/types';

interface LazyPhotoGridProps {
  posts: Post[];
  onPhotoClick: (post: Post) => void;
}

export const LazyPhotoGrid = ({ posts, onPhotoClick }: LazyPhotoGridProps) => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const batchSize = 12; // Load 12 posts at a time
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with first batch
  useEffect(() => {
    setVisiblePosts(posts.slice(0, batchSize));
    setHasMore(posts.length > batchSize);
  }, [posts]);

  // Function to load more posts
  const loadMorePosts = () => {
    const currentLength = visiblePosts.length;
    const nextBatch = posts.slice(currentLength, currentLength + batchSize);
    
    if (nextBatch.length > 0) {
      setVisiblePosts(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch.length < posts.length);
    }
  };

  // Check if we should load more posts
  useEffect(() => {
    const handleScroll = () => {
      // For window scroll
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        if (hasMore) {
          loadMorePosts();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, visiblePosts.length]);

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {visiblePosts.map((post) => (
        <LazyPhotoItem
          key={post.id}
          post={post}
          onClick={() => onPhotoClick(post)}
        />
      ))}
    </div>
  );
};