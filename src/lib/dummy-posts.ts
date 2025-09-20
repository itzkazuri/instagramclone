import { Post, User, Media, Comment } from "@/types";

// --- User Data ---
export const DUMMY_USERS: User[] = [
  {
    id: "user-1",
    username: "hatsune_miku",
    cosplayerName: "Hatsune Miku",
    avatar: "/placeholders/miku-avatar.jpg",
    isVerified: true,
  },
  {
    id: "user-2",
    username: "gawr_gura",
    cosplayerName: "Gawr Gura",
    avatar: "/placeholders/gura-avatar.jpg",
    isVerified: true,
  },
  {
    id: "user-3",
    username: "raiden_shogun",
    cosplayerName: "Raiden Shogun",
    avatar: "/placeholders/raiden-avatar.jpg",
    isVerified: true,
  },
  {
    id: "user-4",
    username: "kobo_kanaeru",
    cosplayerName: "Kobo Kanaeru",
    avatar: "/placeholders/kobo-avatar.jpg",
    isVerified: true,
  },
  {
    id: "user-5",
    username: "nakiri_ayame",
    cosplayerName: "Nakiri Ayame",
    avatar: "/placeholders/ayame-avatar.jpg",
    isVerified: true,
  },
];

// --- Current User ---
export const DUMMY_USER_PROFILE: User = DUMMY_USERS[0];

// --- Media Data ---
const DUMMY_MEDIA: Media[] = [
  {
    id: "media-1",
    type: "IMAGE",
    url: "https://picsum.photos/seed/miku-1/1080/1350",
    altText: "Hatsune Miku cosplay photo 1"
  },
  {
    id: "media-2",
    type: "IMAGE",
    url: "https://picsum.photos/seed/miku-2/1080/1350",
    altText: "Hatsune Miku cosplay photo 2"
  },
  {
    id: "media-3",
    type: "IMAGE",
    url: "https://picsum.photos/seed/gura-1/1080/1080",
    altText: "Gawr Gura cosplay"
  },
  {
    id: "media-4",
    type: "VIDEO",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    altText: "Raiden Shogun cosplay video"
  },
  {
    id: "media-5",
    type: "IMAGE",
    url: "https://picsum.photos/seed/raiden-1/1080/1350",
    altText: "Raiden Shogun cosplay photo"
  },
];

// --- Comment Generation ---
const generateComments = (count: number, postId: string): Comment[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `comment-${postId}-${i}`,
    author: DUMMY_USERS[(i + 1) % DUMMY_USERS.length],
    content: `This is an amazing cosplay! Love the attention to detail. Comment #${i + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString(),
    likesCount: Math.floor(Math.random() * 100),
    isLiked: Math.random() > 0.5,
  }));
};

// --- Explore Posts ---
export const DUMMY_EXPLORE_POSTS: Post[] = [
  {
    id: "post-1",
    author: DUMMY_USERS[0], // Hatsune Miku
    content: "Just finished my latest photoshoot as Miku! Hope you all like it. Let me know what you think of the new costume design! 🎶 #HatsuneMiku #Vocaloid #Cosplay",
    character: "Hatsune Miku",
    series: "Vocaloid",
    costume: "Custom Future Funk Design",
    media: [DUMMY_MEDIA[0], DUMMY_MEDIA[1]],
    likesCount: 12580,
    commentsCount: 345,
    isLiked: true,
    isSaved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    comments: generateComments(5, "post-1"),
  },
  {
    id: "post-2",
    author: DUMMY_USERS[1], // Gawr Gura
    content: "A! 🔱 #gawrgura #hololive",
    character: "Gawr Gura",
    series: "Hololive EN",
    costume: "Default Outfit",
    media: [DUMMY_MEDIA[2]],
    likesCount: 250000,
    commentsCount: 2103,
    isLiked: false,
    isSaved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    comments: generateComments(8, "post-2"),
  },
  {
    id: "post-3",
    author: DUMMY_USERS[2], // Raiden Shogun
    content: "You will be inlaid upon this statue.",
    character: "Raiden Shogun",
    series: "Genshin Impact",
    costume: "Default Inazuma Outfit",
    media: [DUMMY_MEDIA[3], DUMMY_MEDIA[4]],
    likesCount: 98000,
    commentsCount: 4502,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    comments: generateComments(12, "post-3"),
  },
  // Add more posts to fill the grid
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `post-${i + 4}`,
    author: DUMMY_USERS[(i + 3) % DUMMY_USERS.length],
    content: `Another amazing cosplay day! Post #${i + 4} #Cosplay #${["Vocaloid", "Hololive", "Genshin", "Anime"][i % 4]}`,
    character: ["Sakura Miku", "Watson Amelia", "Kamisato Ayaka", "Tsukumo Sana"][i % 4],
    series: ["Vocaloid", "Hololive EN", "Genshin Impact", "Hololive ID"][i % 4],
    costume: ["Stage Outfit", "Casual", "Battle Armor", "Summer"][i % 4],
    media: [
      {
        id: `media-post-${i + 4}`,
        type: i % 3 === 0 ? "VIDEO" : "IMAGE",
        url: `https://picsum.photos/seed/explore-${i + 4}/1080/${i % 2 === 0 ? "1080" : "1350"}`,
        altText: `Cosplay photo ${i + 4}`
      }
    ],
    likesCount: Math.floor(Math.random() * 50000),
    commentsCount: Math.floor(Math.random() * 1000),
    isLiked: Math.random() > 0.5,
    isSaved: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 10).toISOString(),
    comments: generateComments(Math.floor(Math.random() * 10), `post-${i + 4}`),
  }))
];