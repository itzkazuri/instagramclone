"use client"

import { Image, Plus } from "lucide-react"
import { useRef } from "react"

interface MediaUploadProps {
  onUpload: () => void
  fileInputRef: React.RefObject<HTMLInputElement>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MediaUpload = ({ onUpload, fileInputRef, onFileChange }: MediaUploadProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*,video/*"
        multiple
        className="hidden"
      />
      
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Image className="text-gray-500" size={32} />
      </div>
      
      <h3 className="text-lg font-medium mb-2">Upload Photos or Videos</h3>
      <p className="text-gray-500 text-sm mb-4">Select files from your device</p>
      
      <button
        onClick={onUpload}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Plus size={16} className="mr-2" />
        Select from device
      </button>
    </div>
  )
}