"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { PostMedia } from "@/components/post/PostMedia"
import { Post, User } from "@/types"

interface PostViewModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post
  currentUser: User
}

export const PostViewModal = ({ isOpen, onClose, post, currentUser }: PostViewModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  if (!isOpen) return null

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % post.media.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + post.media.length) % post.media.length)
  }

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex overflow-hidden">
        {/* Media Section */}
        <div className="w-2/3 flex-1">
          <PostMedia
            media={post.media}
            currentMediaIndex={currentMediaIndex}
            onNext={nextMedia}
            onPrev={prevMedia}
          />
        </div>

        {/* Content Section */}
        <div className="w-1/3 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{post.author.cosplayerName || post.author.username}</div>
                <div className="text-gray-500 text-sm">@{post.author.username}</div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
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
        </div>
      </div>
    </div>
  )
}