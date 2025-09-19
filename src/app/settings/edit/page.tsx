'use client';

import { EditProfileForm } from "@/components/settings/EditProfileForm";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { DUMMY_USER_PROFILE } from "@/lib/dummy-data";

export default function EditProfilePage() {
  // In a real app, you would fetch the current user's data
  const currentUser = DUMMY_USER_PROFILE;

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <SettingsSidebar />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
          <EditProfileForm profile={currentUser} />
        </div>
      </div>
    </div>
  );
}
