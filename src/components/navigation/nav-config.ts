import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle, // Changed from Heart
  Heart,
  User,
  Settings,
  PlusSquare,
} from "lucide-react"

export interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  isSpecial?: boolean
}

export const navigationItems: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Compass,
  },
  {
    title: "Reels",
    url: "/reels",
    icon: Film,
  },
  {
    title: "Messages",
    url: "/dm", // Changed from /messages
    icon: MessageCircle, // Changed from Heart
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Heart,
    badge: 12,
  },
]

export const secondaryItems: NavItem[] = [
  {
    title: "Profile",
    url: "/user/hatsune_miku", // Changed to a specific profile for now
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings/edit", // Changed from /settings
    icon: Settings,
  },
]

export const mobileNavItems: NavItem[] = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Explore",
    icon: Compass,
    url: "/explore",
  },
  {
    title: "Reels",
    icon: Film,
    url: "/reels",
  },
  {
    title: "Create",
    icon: PlusSquare,
    url: "/create",
  },
  {
    title: "Messages",
    icon: MessageCircle,
    url: "/dm",
  },
  {
    title: "Profile",
    icon: User,
    url: "/user/hatsune_miku", // Changed to a specific profile for now
  },
]