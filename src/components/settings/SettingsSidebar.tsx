'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const settingsNavItems = [
  { title: "Edit Profile", url: "/settings/edit" },
  { title: "Account", url: "/settings/account" },
  { title: "Password", url: "/settings/password" },
  { title: "Notifications", url: "/settings/notifications" },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r pr-4">
      {settingsNavItems.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md hover:bg-muted",
            pathname === item.url ? "bg-muted font-semibold" : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
