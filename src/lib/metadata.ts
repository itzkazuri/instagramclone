// src/lib/metadata.ts
import { Post, User, Media } from '@prisma/client';
import { Reel, ReelUser } from './dummy-data';

// Tipe untuk metadata universal
export type UniversalMetadata = {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

// Fungsi untuk menghasilkan metadata universal dari post
export function generatePostMetadata(post: Post & { author: User; media?: Media[] }): UniversalMetadata {
  // Tentukan gambar utama dari media post jika ada
  const mainImage = post.media?.find(media => media.type === 'IMAGE')?.url || 
                   post.media?.[0]?.url || 
                   undefined;
  
  // Buat deskripsi dari konten post
  const description = post.content ? 
    (post.content.length > 160 ? post.content.substring(0, 157) + '...' : post.content) : 
    `Post by ${post.author.cosplayerName || post.author.username} on Cosplayer Medsos`;
  
  return {
    title: `${post.character || 'Cosplay'} by ${post.author.cosplayerName || post.author.username}`,
    description,
    image: mainImage,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/post/${post.id}`,
    type: 'article',
    siteName: 'Cosplayer Medsos',
    locale: 'en_US',
    author: post.author.cosplayerName || post.author.username,
    publishedTime: post.createdAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    tags: post.series ? [post.series] : undefined
  };
}

// Fungsi untuk menghasilkan metadata universal dari reel
export function generateReelMetadata(reel: Reel): UniversalMetadata {
  return {
    title: `${reel.user.name} on Cosplayer Reels`,
    description: reel.caption || `Watch ${reel.user.name}'s reel on Cosplayer Medsos`,
    image: reel.videoUrl, // Using video URL as image for now, can be improved with thumbnail
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reels/${reel.id}`,
    type: 'video.other',
    siteName: 'Cosplayer Medsos',
    locale: 'en_US',
    author: reel.user.name,
    publishedTime: reel.createdAt,
    tags: reel.audio ? [reel.audio] : undefined
  };
}

// Fungsi untuk menghasilkan metadata universal dari user
export function generateUserMetadata(user: User): UniversalMetadata {
  return {
    title: `${user.cosplayerName || user.username} - Cosplayer Profile`,
    description: user.bio || `Profile of ${user.cosplayerName || user.username} on Cosplayer Medsos`,
    image: user.avatar || undefined,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/user/${user.slug}`,
    type: 'profile',
    siteName: 'Cosplayer Medsos',
    locale: 'en_US',
    author: user.cosplayerName || user.username,
    publishedTime: user.createdAt.toISOString(),
    modifiedTime: user.updatedAt.toISOString()
  };
}

// Fungsi untuk menghasilkan metadata universal default
export function generateDefaultMetadata(): UniversalMetadata {
  return {
    title: 'Cosplayer Medsos - Share Your Cosplay Journey',
    description: 'Connect with fellow cosplayers, share your creations, and discover amazing cosplays from around the world.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    type: 'website',
    siteName: 'Cosplayer Medsos',
    locale: 'en_US'
  };
}

// Fungsi untuk mengonversi metadata universal ke format Next.js
export function convertToNextMetadata(metadata: UniversalMetadata) {
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      siteName: metadata.siteName,
      locale: metadata.locale,
      type: metadata.type,
      images: metadata.image ? [
        {
          url: metadata.image,
          alt: metadata.title,
        }
      ] : undefined,
      authors: metadata.author ? [metadata.author] : undefined,
      publishedTime: metadata.publishedTime,
      modifiedTime: metadata.modifiedTime,
      tags: metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [metadata.image] : undefined,
      creator: metadata.author ? `@${metadata.author.replace(/\s+/g, '')}` : undefined,
    }
  };
}