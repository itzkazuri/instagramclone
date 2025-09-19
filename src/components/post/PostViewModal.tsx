"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostContent } from "./PostContent"
import { PostActions } from "./PostActions"
import { PostComments } from "./PostComments"
import { CommentInput } from "./CommentInput"
import { Post, User } from "@/types"

interface PostViewModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post
  currentUser: User
}

export const PostViewModal = ({ isOpen, onClose, post, currentUser }: PostViewModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isSaved, setIsSaved] = useState(post.isSaved)
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [comments, setComments] = useState(post.comments)
  const [newComment, setNewComment] = useState("")
  const [isFollowing, setIsFollowing] = useState(false) // Dummy state

  if (!isOpen) return null

  const handleLike = async () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
    // API call would go here
  }

  const handleSave = async () => {
    setIsSaved(!isSaved)
    // API call would go here
  }

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev)
    // API call would go here later
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: {
        id: currentUser.id, // Add id to the author object
        username: currentUser.username,
        cosplayerName: currentUser.cosplayerName || currentUser.username,
        avatar: currentUser.avatar || "/api/placeholder/32/32",
      },
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false,
    }

    setComments((prev) => [...prev, comment])
    setNewComment("")
    // API call would go here
  }

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % post.media.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + post.media.length) % post.media.length)
  }

  const isCurrentUser = post?.author?.id === currentUser?.id;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] flex overflow-hidden">
        {/* Media Section */}
        <PostMedia
          media={post.media}
          currentMediaIndex={currentMediaIndex}
          onNext={nextMedia}
          onPrev={prevMedia}
        />

        {/* Content Section */}
        <div className="w-80 flex flex-col">
          {/* Header */}
          <PostHeader
            author={post.author}
            onClose={onClose}
            isFollowing={isFollowing}
            onFollowToggle={handleFollowToggle}
            isCurrentUser={isCurrentUser}
          />

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <PostContent
              content={post.content}
              character={post.character}
              series={post.series}
              costume={post.costume}
              createdAt={post.createdAt}
            />

            <PostComments comments={comments} />
          </div>

          {/* Actions */}
          <div className="p-4 border-t">
            <PostActions
              isLiked={isLiked}
              isSaved={isSaved}
              likesCount={likesCount}
              onLike={handleLike}
              onSave={handleSave}
            />

            <CommentInput
              currentUser={currentUser}
              newComment={newComment}
              setNewComment={setNewComment}
              onSubmit={handleComment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
