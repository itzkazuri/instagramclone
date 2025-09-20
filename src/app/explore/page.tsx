'use client';

import { useState, useMemo } from "react";
import { LazyPhotoGrid } from "@/components/explore/LazyPhotoGrid";
import { PostViewModal } from "@/components/post/PostViewModal";
import { MobileExploreSearch } from "@/components/navigation/MobileExploreSearch";
import { DUMMY_EXPLORE_POSTS, DUMMY_USER_PROFILE } from "@/lib/dummy-posts";
import { Post } from "@/types";
import { useRouter } from "next/navigation";
import { shuffleArray } from "@/lib/shuffleArray";

export default function ExplorePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const router = useRouter();

  // Shuffle posts only once when component mounts
  const shuffledPosts = useMemo(() => {
    return shuffleArray(DUMMY_EXPLORE_POSTS);
  }, []);

  const handlePhotoClick = (post: Post) => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Navigate to the post page
      router.push(`/explore/post/${post.id}`);
    } else {
      // Show the modal for desktop
      setSelectedPost(post);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto py-8 pt-16 md:pt-8"> {/* Added pt-16 for mobile search bar */}
      <MobileExploreSearch /> {/* Mobile search component */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-bold mb-6">Explore</h1>
      </div>
      <LazyPhotoGrid posts={shuffledPosts} onPhotoClick={handlePhotoClick} />

      {selectedPost && !selectedPost.id.includes('filler') && (
        <PostViewModal
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
          post={selectedPost}
          currentUser={DUMMY_USER_PROFILE}
        />
      )}
    </div>
  );
}