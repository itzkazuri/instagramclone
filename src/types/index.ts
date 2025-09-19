export interface User {
  id: string
  username: string
  cosplayerName: string
  avatar: string
  isVerified?: boolean
}

export interface Media {
  id: string
  type: "IMAGE" | "VIDEO"
  url: string
  altText: string
  width?: number
  height?: number
}

export interface Comment {
  id: string
  author: User
  content: string
  createdAt: string
  likesCount: number
  isLiked: boolean
}

export interface Post {
  id: string
  author: User
  content: string
  character?: string
  series?: string
  costume?: string
  media: Media[]
  likesCount: number
  commentsCount: number
  isLiked: boolean
  isSaved: boolean
  createdAt: string
  comments: Comment[]
}