"use client"

import { useState } from "react"
import { StoryCircle } from "./StoryCircle"
import Link from "next/link"

interface UserStory {
  id: string
  username: string
  avatar: string
  hasUnseenStory: boolean
}

const mockStories: UserStory[] = [
  { id: "1", username: "Your Story", avatar: "/current-user-avatar.png", hasUnseenStory: false },
  { id: "2", username: "naruto_fan", avatar: "/api/placeholder/40/40", hasUnseenStory: true },
  { id: "3", username: "sakura_cosplay", avatar: "/api/placeholder/40/40", hasUnseenStory: true },
  { id: "4", username: "anime_lover", avatar: "/api/placeholder/40/40", hasUnseenStory: false },
  { id: "5", username: "game_master", avatar: "/api/placeholder/40/40", hasUnseenStory: true },
  { id: "6", username: "cosplay_king", avatar: "/api/placeholder/40/40", hasUnseenStory: false },
  { id: "7", username: "manga_reader", avatar: "/api/placeholder/40/40", hasUnseenStory: true },
  { id: "8", username: "otaku_girl", avatar: "/api/placeholder/40/40", hasUnseenStory: false },
]

export function StoryCarousel() {
  const [stories] = useState<UserStory[]>(mockStories)

  return (
    <div className="flex space-x-4 p-4 border-b overflow-x-auto hide-scrollbar">
      {stories.map((story) => (
        <Link href="/stories" key={story.id}>
          <StoryCircle
            username={story.username}
            avatar={story.avatar}
            hasUnseenStory={story.hasUnseenStory}
            isOwnStory={story.id === "1"}
          />
        </Link>
      ))}
    </div>
  )
}