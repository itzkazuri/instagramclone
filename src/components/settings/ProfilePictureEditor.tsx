import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/dummy-data";

interface ProfilePictureEditorProps {
    profile: UserProfile;
}

export function ProfilePictureEditor({ profile }: ProfilePictureEditorProps) {
    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{profile.username}</p>
                <Button variant="link" className="p-0 h-auto text-blue-500">Change profile photo</Button>
            </div>
        </div>
    );
}