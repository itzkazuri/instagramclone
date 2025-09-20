import { Comment } from "@/types";

export const generateDummyComments = (count: number): Comment[] => {
  const users = [
    {
      id: "user1",
      username: "hatsune_miku",
      cosplayerName: "Hatsune Miku",
      avatar: "/placeholders/miku-avatar.jpg",
      isVerified: true,
    },
    {
      id: "user2",
      username: "gawr_gura",
      cosplayerName: "Gawr Gura",
      avatar: "/placeholders/gura-avatar.jpg",
      isVerified: true,
    },
    {
      id: "user3",
      username: "raiden_shogun",
      cosplayerName: "Raiden Shogun",
      avatar: "/placeholders/raiden-avatar.jpg",
      isVerified: true,
    },
    {
      id: "user4",
      username: "kobo_kanaeru",
      cosplayerName: "Kobo Kanaeru",
      avatar: "/placeholders/kobo-avatar.jpg",
      isVerified: true,
    },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `comment-${i}`,
    author: users[i % users.length],
    content: `This is an amazing reel! Comment #${i + 1}. Keep up the great work!`,
    createdAt: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 3,
    ).toISOString(),
    likesCount: Math.floor(Math.random() * 100),
    isLiked: Math.random() > 0.7,
  }));
};