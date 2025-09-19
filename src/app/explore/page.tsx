'use client';

import { useState } from "react";
import { PhotoGrid } from "@/components/explore/PhotoGrid";
import { PostViewModal } from "@/components/post/PostViewModal";
import { DUMMY_EXPLORE_POSTS, DUMMY_USER_PROFILE } from "@/lib/dummy-data";
import { Post } from "@/types";

export default function ExplorePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePhotoClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <PhotoGrid posts={DUMMY_EXPLORE_POSTS} onPhotoClick={handlePhotoClick} />

      {selectedPost && (
        <PostViewModal
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
          post={selectedPost}
          currentUser={DUMMY_USER_PROFILE} // Assuming the profile user is the current user for now
        />
      )}
    </div>
  );
}