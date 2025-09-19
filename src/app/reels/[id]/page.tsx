// src/app/reels/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import { DUMMY_REELS } from '@/lib/dummy-data';
import { convertToNextMetadata, generateReelMetadata } from '@/lib/metadata';
import { VideoPlayer } from '@/components/reels/VideoPlayer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark, Music } from 'lucide-react';

// Generate metadata for this page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const reel = DUMMY_REELS.find(r => r.id === params.id);
  
  if (!reel) {
    // If reel not found, use default metadata
    return convertToNextMetadata({
      title: 'Reel Not Found',
      description: 'The requested reel could not be found',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reels/${params.id}`,
      type: 'website',
      siteName: 'Cosplayer Medsos',
      locale: 'en_US'
    });
  }
  
  // Generate specific metadata for this reel
  const metadata = generateReelMetadata(reel);
  return convertToNextMetadata(metadata);
}

export default function ReelDetailPage({ params }: { params: { id: string } }) {
  const reel = DUMMY_REELS.find(r => r.id === params.id);
  
  if (!reel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src={reel.user.avatar} alt={reel.user.name} />
              <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">@{reel.user.username}</h1>
              <p className="text-gray-400">{reel.user.name}</p>
            </div>
            {reel.user.isVerified && (
              <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </div>

          <div className="relative aspect-[9/16] w-full max-w-md mx-auto mb-6">
            <video
              src={reel.videoUrl}
              className="w-full h-full object-cover rounded-lg"
              loop
              muted
              controls
              autoPlay
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{reel.caption}</h2>
            {reel.audio && (
              <div className="flex items-center text-gray-400">
                <Music className="w-4 h-4 mr-2" />
                <span>{reel.audio}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-800 pt-4">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                <span>{reel.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                <span>{reel.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center">
                <Send className="w-6 h-6 mr-2" />
                <span>{reel.shares}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Bookmark className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}