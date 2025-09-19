import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/dummy-data";
import { Settings } from "lucide-react";

interface ProfileHeaderProps {
  profile: UserProfile;
  isCurrentUser: boolean;
}

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="text-center md:text-left">
    <span className="font-bold">{value}</span>
    <span className="text-muted-foreground"> {label}</span>
  </div>
);

export function ProfileHeader({ profile, isCurrentUser }: ProfileHeaderProps) {
  return (
    <div className="px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <Avatar className="h-24 w-24 md:h-36 md:w-36 border-4 border-background">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info & Stats */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-2xl font-light text-muted-foreground">{profile.username}</h1>
            {isCurrentUser ? (
              <div className="flex items-center space-x-2">
                <Button variant="secondary">Edit Profile</Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button>Follow</Button>
                <Button variant="secondary">Message</Button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <StatItem value={profile.stats.posts} label="posts" />
            <StatItem value={profile.stats.followers} label="followers" />
            <StatItem value={profile.stats.following} label="following" />
          </div>

          <div>
            <h2 className="font-semibold">{profile.name}</h2>
            <p className="text-sm whitespace-pre-line">{profile.bio}</p>
            <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-900">
              {profile.website}
            </a>
          </div>
        </div>
      </div>

      {/* Stats for Mobile */}
      <div className="md:hidden flex justify-around items-center border-t border-b py-2 mt-4 text-sm">
        <StatItem value={profile.stats.posts} label="posts" />
        <StatItem value={profile.stats.followers} label="followers" />
        <StatItem value={profile.stats.following} label="following" />
      </div>
    </div>
  );
}
