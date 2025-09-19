import { ProfilePictureEditor } from "./ProfilePictureEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/lib/dummy-data";

interface EditProfileFormProps {
  profile: UserProfile;
}

const FormField = ({ id, label, children }: { id: string, label: string, children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-4">
        <Label htmlFor={id} className="md:text-right md:py-2 font-semibold">{label}</Label>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
);

export function EditProfileForm({ profile }: EditProfileFormProps) {
  // In a real app, you'd use form state management like react-hook-form

  return (
    <form className="space-y-8"
        onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
        }}
    >
        <FormField id="avatar" label="Profile Picture">
            <ProfilePictureEditor profile={profile} />
        </FormField>

        <FormField id="username" label="Username">
            <Input id="username" defaultValue={profile.username} />
        </FormField>

        <FormField id="name" label="Name">
            <Input id="name" defaultValue={profile.name} />
        </FormField>

        <FormField id="website" label="Website">
            <Input id="website" defaultValue={profile.website} placeholder="e.g., your-portfolio.com" />
        </FormField>

        <FormField id="bio" label="Bio">
            <Textarea id="bio" defaultValue={profile.bio} />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
            <div className="md:col-start-2 md:col-span-3">
                <Button type="submit">Submit</Button>
            </div>
        </div>
    </form>
  );
}
