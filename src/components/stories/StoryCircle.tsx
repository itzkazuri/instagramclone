"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

interface StoryCircleProps {
  username?: string
  avatar?: string
  isOwnStory?: boolean
  hasUnseenStory?: boolean
  onClick?: () => void
}

export function StoryCircle({ 
  username, 
  avatar, 
  isOwnStory = false, 
  hasUnseenStory = false,
  onClick 
}: StoryCircleProps) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div 
        className={`
          relative rounded-full p-0.5 cursor-pointer
          ${hasUnseenStory ? 'bg-gradient-to-tr from-yellow-400 to-purple-600' : 'bg-gray-300'}
          ${isOwnStory ? 'bg-gradient-to-tr from-gray-300 to-gray-300' : ''}
        `}
        onClick={onClick}
      >
        <Avatar className="h-14 w-14 border-2 border-white rounded-full">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
          <AvatarFallback>
            {username ? username.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        {isOwnStory && (
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <Plus className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
      {username && (
        <span className="text-xs max-w-[72px] truncate text-center">
          {username.length > 10 ? `${username.substring(0, 10)}...` : username}
        </span>
      )}
    </div>
  )
}