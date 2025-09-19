import { DUMMY_USER_PROFILE } from "@/lib/dummy-data";
import { ProfileHeader } from "@/components/user/ProfileHeader";
import { ProfileTabs } from "@/components/user/ProfileTabs";
import { generateUserMetadata, convertToNextMetadata } from "@/lib/metadata";

// This would typically come from a session or auth context
const CURRENT_USER_SLUG = "hatsune_miku";

// Generate metadata for this page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the profile based on params.slug
  // For this dummy version, we'll just use the same profile regardless of slug.
  const profile = DUMMY_USER_PROFILE;
  const metadata = generateUserMetadata(profile);
  return convertToNextMetadata(metadata);
}

export default function UserProfilePage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the profile based on params.slug
  // For this dummy version, we'll just use the same profile regardless of slug.
  const profile = DUMMY_USER_PROFILE;
  const isCurrentUser = params.slug === CURRENT_USER_SLUG;

  return (
    <div className="container mx-auto max-w-4xl">
      <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
      <ProfileTabs profile={profile} />
    </div>
  );
}
