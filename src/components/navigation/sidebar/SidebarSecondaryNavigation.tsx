'use client';

import Link from "next/link";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { secondaryItems } from "../nav-config";

interface SidebarSecondaryNavigationProps {
  closeSearchPanel: () => void;
}

export function SidebarSecondaryNavigation({ closeSearchPanel }: SidebarSecondaryNavigationProps) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <SidebarMenu className="space-y-2">
      {secondaryItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link href={item.url} onClick={closeSearchPanel}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={isActive(item.url)}
              className={cn(
                "py-5 px-3 rounded-xl text-left justify-start",
                "hover:bg-gray-50 transition-all duration-200",
                "group",
                isActive(item.url) && "bg-gray-100 font-semibold"
              )}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="relative">
                  <item.icon className={cn(
                    "h-7 w-7 transition-transform group-hover:scale-110",
                    isActive(item.url) && "text-black font-bold"
                  )} />
                  {isActive(item.url) && (
                    <div className="absolute -left-1 top-0 w-1 h-7 bg-black rounded-full" />
                  )}
                </div>
                <span className={cn(
                  "text-lg font-medium",
                  isActive(item.url) && "font-bold text-black"
                )}>
                  {item.title}
                </span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}