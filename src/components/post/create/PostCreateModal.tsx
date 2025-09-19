"use client"

import { useState, useRef } from "react"
import { X, Image, Plus, Trash2 } from "lucide-react"
import { MediaPreview } from "./MediaPreview"
import { MediaUpload } from "./MediaUpload"
import { PostForm } from "./PostForm"
import { usePostCreation } from "@/hooks/usePostCreation"

interface PostCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onPostCreated: () => void
}

export const PostCreateModal = ({ isOpen, onClose, onPostCreated }: PostCreateModalProps) => {
  const {
    mediaFiles,
    previewUrls,
    postContent,
    character,
    series,
    costume,
    isSubmitting,
    addMedia,
    removeMedia,
    setPostContent,
    setCharacter,
    setSeries,
    setCostume,
    handleSubmit,
  } = usePostCreation(onPostCreated)

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      addMedia(files)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {mediaFiles.length === 0 ? (
            <MediaUpload 
              onUpload={triggerFileInput}
              fileInputRef={fileInputRef}
              onFileChange={handleMediaUpload}
            />
          ) : (
            <div className="space-y-4">
              <MediaPreview 
                previewUrls={previewUrls}
                onRemove={removeMedia}
              />
              
              <PostForm
                postContent={postContent}
                character={character}
                series={series}
                costume={costume}
                onContentChange={setPostContent}
                onCharacterChange={setCharacter}
                onSeriesChange={setSeries}
                onCostumeChange={setCostume}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          {mediaFiles.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Share"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}