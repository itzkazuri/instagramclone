"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface PostFormProps {
  postContent: string
  character: string
  series: string
  costume: string
  onContentChange: (value: string) => void
  onCharacterChange: (value: string) => void
  onSeriesChange: (value: string) => void
  onCostumeChange: (value: string) => void
}

export const PostForm = ({
  postContent,
  character,
  series,
  costume,
  onContentChange,
  onCharacterChange,
  onSeriesChange,
  onCostumeChange
}: PostFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Caption</label>
        <Textarea
          value={postContent}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Write a caption..."
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Character</label>
        <Input
          value={character}
          onChange={(e) => onCharacterChange(e.target.value)}
          placeholder="Character name"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Series</label>
        <Input
          value={series}
          onChange={(e) => onSeriesChange(e.target.value)}
          placeholder="Series name"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Costume Description</label>
        <Input
          value={costume}
          onChange={(e) => onCostumeChange(e.target.value)}
          placeholder="Costume details"
          className="mt-1"
        />
      </div>
    </div>
  )
}