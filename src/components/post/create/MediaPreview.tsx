"use client"

import { Trash2 } from "lucide-react"

interface MediaPreviewProps {
  previewUrls: string[]
  onRemove: (index: number) => void
}

export const MediaPreview = ({ previewUrls, onRemove }: MediaPreviewProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {previewUrls.map((url, index) => (
        <div key={index} className="relative group">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}