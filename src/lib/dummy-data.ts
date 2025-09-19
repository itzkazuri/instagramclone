
export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

export type Message = {
  id: string;
  text: string;
  timestamp: string;
  isSender: boolean; // true if the message is from the logged-in user
};

export const DUMMY_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    name: "Hatsune Miku",
    avatar: "/placeholders/miku-avatar.jpg",
    lastMessage: "Can you send me the project files?",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "conv2",
    name: "Gawr Gura",
    avatar: "/placeholders/gura-avatar.jpg",
    lastMessage: "A",
    timestamp: "9:45 AM",
    unreadCount: 0,
  },
  {
    id: "conv3",
    name: "Raiden Shogun",
    avatar: "/placeholders/raiden-avatar.jpg",
    lastMessage: "You will be inlaid upon this statue.",
    timestamp: "Yesterday",
    unreadCount: 1,
  },
  {
    id: "conv4",
    name: "Kobo Kanaeru",
    avatar: "/placeholders/kobo-avatar.jpg",
    lastMessage: "Hujan lagi, males ngonten.",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
];

export const DUMMY_MESSAGES: Record<string, Message[]> = {
  conv1: [
    { id: "msg1-1", text: "Hey, are you free this weekend?", timestamp: "10:28 AM", isSender: false },
    { id: "msg1-2", text: "I was thinking we could go to the new cafe.", timestamp: "10:29 AM", isSender: false },
    { id: "msg1-3", text: "Sure, sounds great! What time?", timestamp: "10:29 AM", isSender: true },
    { id: "msg1-4", text: "How about 2 PM on Saturday?", timestamp: "10:30 AM", isSender: true },
    { id: "msg1-5", text: "Can you send me the project files?", timestamp: "10:30 AM", isSender: false },
  ],
  conv2: [
    { id: "msg2-1", text: "Shaaaark!", timestamp: "9:44 AM", isSender: true },
    { id: "msg2-2", text: "A", timestamp: "9:45 AM", isSender: false },
  ],
  conv3: [
    { id: "msg3-1", text: "Inazuma shines eternal!", timestamp: "Yesterday", isSender: true },
    { id: "msg3-2", text: "You will be inlaid upon this statue.", timestamp: "Yesterday", isSender: false },
  ],
  conv4: [],
};

// --- User Profile Data ---

export type Post = {
  id: string;
  mediaUrl: string;
  likes: number;
  comments: number;
};

export type UserProfile = {
  id: string;
  slug: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  website: string;
  stats: {
    posts: number;
    followers: string;
    following: number;
  };
  posts: Post[];
};

export const DUMMY_USER_PROFILE: UserProfile = {
  id: "user1",
  slug: "hatsune_miku",
  name: "Hatsune Miku",
  username: "hatsune_miku",
  avatar: "/placeholders/miku-avatar.jpg",
  bio: "Digital Singer | From Sapporo, Japan to stages worldwide. Bringing you the sound of the future! 蔥蔥蔥蔥蔥 #vocaloid #mikuhatsune",
  website: "piapro.net",
  stats: {
    posts: 1337,
    followers: "3.9M",
    following: 1,
  },
  posts: Array.from({ length: 15 }, (_, i) => ({
    id: `post${i + 1}`,
    mediaUrl: `https://picsum.photos/seed/miku-post-${i + 1}/500/500`,
    likes: Math.floor(Math.random() * 50000),
    comments: Math.floor(Math.random() * 2000),
  })),
};

// --- Search Data ---
export type SearchResult = {
  id: string;
  username: string;
  name: string;
  avatar: string;
};

export const DUMMY_SEARCH_RESULTS: SearchResult[] = [
  {
    id: "user2",
    username: "gawr_gura",
    name: "Gawr Gura",
    avatar: "/placeholders/gura-avatar.jpg",
  },
  {
    id: "user3",
    username: "raiden_shogun",
    name: "Raiden Shogun",
    avatar: "/placeholders/raiden-avatar.jpg",
  },
  {
    id: "user4",
    username: "kobo_kanaeru",
    name: "Kobo Kanaeru",
    avatar: "/placeholders/kobo-avatar.jpg",
  },
  {
    id: "user5",
    username: "nakiri_ayame",
    name: "Nakiri Ayame",
    avatar: "/placeholders/ayame-avatar.jpg",
  },
];

// --- Explore Page Posts ---

const generateComments = (count: number): Comment[] => {
  const users = [DUMMY_USER_PROFILE, ...DUMMY_SEARCH_RESULTS];
  return Array.from({ length: count }, (_, i) => ({
    id: `comment-${Date.now()}-${i}`,
    author: users[i % users.length],
    content: `This is a dummy comment #${i + 1}. Great cosplay!`,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString(),
    likesCount: Math.floor(Math.random() * 100),
    isLiked: Math.random() > 0.5,
  }));
};

export const DUMMY_EXPLORE_POSTS: Post[] = [
  {
    id: "post-1",
    author: DUMMY_USER_PROFILE,
    content: "Just finished my latest photoshoot as Miku! Hope you all like it. Let me know what you think of the new costume design! 🎶 #HatsuneMiku #Vocaloid #Cosplay",
    character: "Hatsune Miku",
    series: "Vocaloid",
    costume: "Custom Future Funk Design",
    media: [
      { id: "media-1-1", type: "IMAGE", url: "https://picsum.photos/seed/explore-1/1080/1350", altText: "Hatsune Miku cosplay photo 1" },
      { id: "media-1-2", type: "IMAGE", url: "https://picsum.photos/seed/explore-2/1080/1350", altText: "Hatsune Miku cosplay photo 2" },
    ],
    likesCount: 12580,
    commentsCount: 345,
    isLiked: true,
    isSaved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    comments: generateComments(5),
  },
  {
    id: "post-2",
    author: DUMMY_SEARCH_RESULTS[0], // Gawr Gura
    content: "A! 🔱 #gawrgura #hololive",
    character: "Gawr Gura",
    series: "Hololive EN",
    costume: "Default Outfit",
    media: [
      { id: "media-2-1", type: "IMAGE", url: "https://picsum.photos/seed/explore-3/1080/1080", altText: "Gawr Gura cosplay" },
    ],
    likesCount: 250000,
    commentsCount: 2103,
    isLiked: false,
    isSaved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    comments: generateComments(8),
  },
  {
    id: "post-3",
    author: DUMMY_SEARCH_RESULTS[1], // Raiden Shogun
    content: "You will be inlaid upon this statue.",
    character: "Raiden Shogun",
    series: "Genshin Impact",
    costume: "Default Inazuma Outfit",
    media: [
      { id: "media-3-1", type: "VIDEO", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", altText: "Raiden Shogun cosplay video" },
      { id: "media-3-2", type: "IMAGE", url: "https://picsum.photos/seed/explore-4/1080/1350", altText: "Raiden Shogun cosplay photo" },
    ],
    likesCount: 98000,
    commentsCount: 4502,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    comments: generateComments(12),
  },
  // Add more posts to fill the grid
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `post-filler-${i}`,
    author: DUMMY_SEARCH_RESULTS[(i+2) % DUMMY_SEARCH_RESULTS.length],
    content: `Another amazing day at the convention! Post #${i+4}`,
    media: [
      { id: `media-filler-${i}`, type: "IMAGE", url: `https://picsum.photos/seed/explore-filler-${i}/1080/1080`, altText: `Filler post image ${i}` }
    ],
    likesCount: Math.floor(Math.random() * 10000),
    commentsCount: Math.floor(Math.random() * 500),
    isLiked: Math.random() > 0.5,
    isSaved: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 10).toISOString(),
    comments: generateComments(Math.floor(Math.random() * 5)),
  }))
];

// --- Reels Data ---

export type ReelUser = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
};

export type Reel = {
  id: string;
  user: ReelUser;
  videoUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  audio?: string;
  createdAt: string;
};

export const DUMMY_REELS: Reel[] = [
  {
    id: "reel-1",
    user: {
      id: "user-1",
      name: "Hatsune Miku",
      username: "hatsune_miku",
      avatar: "/placeholders/miku-avatar.jpg",
      isVerified: true,
    },
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    caption: "New Miku outfit reveal! What do you think? #HatsuneMiku #Vocaloid #Cosplay",
    likes: 12500,
    comments: 342,
    shares: 89,
    audio: "Original Sound - Hatsune Miku",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "reel-2",
    user: {
      id: "user-2",
      name: "Gawr Gura",
      username: "gawr_gura",
      avatar: "/placeholders/gura-avatar.jpg",
      isVerified: true,
    },
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    caption: "Shark week special! 🔱 #GawrGura #Hololive #Shark",
    likes: 250000,
    comments: 2103,
    shares: 1200,
    audio: "Shark Song - Gawr Gura",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "reel-3",
    user: {
      id: "user-3",
      name: "Raiden Shogun",
      username: "raiden_shogun",
      avatar: "/placeholders/raiden-avatar.jpg",
      isVerified: true,
    },
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    caption: "You will be inlaid upon this statue. ⚡ #RaidenShogun #GenshinImpact",
    likes: 98000,
    comments: 4502,
    shares: 3200,
    audio: "Ei's Theme - Genshin Impact",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "reel-4",
    user: {
      id: "user-4",
      name: "Kamisato Ayaka",
      username: "kamisato_ayaka",
      avatar: "/placeholders/ayaka-avatar.jpg",
      isVerified: true,
    },
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    caption: "Snow dance practice for the festival! ❄️ #KamisatoAyaka #GenshinImpact #Inazuma",
    likes: 76500,
    comments: 1876,
    shares: 980,
    audio: "Sakura Blossom - Kamisato Ayaka",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "reel-5",
    user: {
      id: "user-5",
      name: "Nakiri Ayame",
      username: "nakiri_ayame",
      avatar: "/placeholders/ayame-avatar.jpg",
      isVerified: true,
    },
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    caption: "New kitchen cosplay! Who's hungry? 🍱 #NakiriAyame #Hololive #Foodie",
    likes: 156000,
    comments: 3201,
    shares: 2100,
    audio: "Cooking Beats - Nakiri Ayame",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
];

// --- Notifications Data ---

export type NotificationType = 'likes' | 'comments' | 'follows' | 'mentions';

export type NotificationUser = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

export type Notification = {
  id: string;
  type: NotificationType;
  user?: NotificationUser;
  postPreview?: string;
  isRead: boolean;
  createdAt: string;
};

export const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "follows",
    user: {
      id: "user-1",
      name: "Hatsune Miku",
      username: "hatsune_miku",
      avatar: "/placeholders/miku-avatar.jpg",
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "notif-2",
    type: "likes",
    user: {
      id: "user-2",
      name: "Gawr Gura",
      username: "gawr_gura",
      avatar: "/placeholders/gura-avatar.jpg",
    },
    postPreview: "Just finished my latest photoshoot as Miku! Hope you all like it. Let me know what you think of the new costume design! 🎶 #HatsuneMiku #Vocaloid #Cosplay",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "notif-3",
    type: "comments",
    user: {
      id: "user-3",
      name: "Raiden Shogun",
      username: "raiden_shogun",
      avatar: "/placeholders/raiden-avatar.jpg",
    },
    postPreview: "Amazing cosplay! The attention to detail is incredible. 🔱",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "notif-4",
    type: "mentions",
    user: {
      id: "user-4",
      name: "Kamisato Ayaka",
      username: "kamisato_ayaka",
      avatar: "/placeholders/ayaka-avatar.jpg",
    },
    postPreview: "Thanks @sakura_cosplay for the inspiration on this outfit! ❄️",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "notif-5",
    type: "follows",
    user: {
      id: "user-5",
      name: "Nakiri Ayame",
      username: "nakiri_ayame",
      avatar: "/placeholders/ayame-avatar.jpg",
    },
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "notif-6",
    type: "likes",
    user: {
      id: "user-6",
      name: "Tsukumo Sana",
      username: "tsukumo_sana",
      avatar: "/placeholders/sana-avatar.jpg",
    },
    postPreview: "New Miku outfit reveal! What do you think? #HatsuneMiku #Vocaloid #Cosplay",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
  },
  {
    id: "notif-7",
    type: "comments",
    user: {
      id: "user-7",
      name: "Houshou Marine",
      username: "houshou_marine",
      avatar: "/placeholders/marine-avatar.jpg",
    },
    postPreview: "This is absolutely stunning! 🔥",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "notif-8",
    type: "follows",
    user: {
      id: "user-8",
      name: "Shirakami Fubuki",
      username: "shirakami_fubuki",
      avatar: "/placeholders/fubuki-avatar.jpg",
    },
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
];
