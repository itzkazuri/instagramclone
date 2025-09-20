// src/app/explore/post/[id]/page.tsx
'use client';

import { useEffect, useState } from "react";
import { DUMMY_EXPLORE_POSTS, DUMMY_USER_PROFILE } from "@/lib/dummy-posts";
import { Post } from "@/types";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/navigation/mobile-nav";

export default function MobilePostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    const foundPost = DUMMY_EXPLORE_POSTS.find(p => p.id === params.id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      // If post not found, redirect to explore
      router.push('/explore');
    }
  }, [params.id, router]);

  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Post media */}
      <div className="relative w-full aspect-square bg-black">
        {post.media && post.media.length > 0 && (
          <img
            src={post.media[0].url || "/placeholder.svg"}
            alt={post.media[0].altText}
            className="w-full h-full object-contain"
          />
        )}
        
        {/* Navigation arrows for multiple media */}
        {post.media.length > 1 && (
          <>
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{post.author.cosplayerName || post.author.username}</div>
            <div className="text-gray-500 text-sm">@{post.author.username}</div>
          </div>
        </div>
        <button 
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-800">{post.content}</p>
        </div>
        
        {post.character && (
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <div className="font-semibold mb-1">Character: {post.character}</div>
            {post.series && <div className="text-sm">Series: {post.series}</div>}
            {post.costume && <div className="text-sm">Costume: {post.costume}</div>}
          </div>
        )}
        
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{post.likesCount} likes</span>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Comments ({post.comments.length})</h3>
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.author.avatar || "/placeholder.svg"}
                  alt={comment.author.username}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="font-semibold text-sm">{comment.author.cosplayerName || comment.author.username}</div>
                    <p className="text-gray-800 text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-gray-500 text-xs">
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <button className="hover:text-red-500">Like</button>
                    <button>Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Added at the bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <MobileNav />
      </div>
    </div>
  );
}