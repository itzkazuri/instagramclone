import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3x3, Clapperboard, Bookmark } from 'lucide-react';
import { ProfilePostGrid } from "./ProfilePostGrid";
import { UserProfile } from "@/lib/dummy-data";

interface ProfileTabsProps {
  profile: UserProfile;
}

export function ProfileTabs({ profile }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts">
          <Grid3x3 className="h-5 w-5 mr-2" /> POSTS
        </TabsTrigger>
        <TabsTrigger value="reels">
          <Clapperboard className="h-5 w-5 mr-2" /> REELS
        </TabsTrigger>
        <TabsTrigger value="saved">
          <Bookmark className="h-5 w-5 mr-2" /> SAVED
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <ProfilePostGrid posts={profile.posts} />
      </TabsContent>
      <TabsContent value="reels">
        <div className="flex items-center justify-center h-64 bg-secondary">
            <p>Reels content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="saved">
        <div className="flex items-center justify-center h-64 bg-secondary">
            <p>Saved content goes here.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
