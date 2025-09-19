'use client';

import Link from "next/link";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";
import { navigationItems } from "../nav-config";

interface SidebarNavigationProps {
  closeSearchPanel: () => void;
}

export function SidebarNavigation({ closeSearchPanel }: SidebarNavigationProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { toggleSearchPanel } = useSearch();

  const searchItem = navigationItems.find(item => item.title === "Search");
  const otherNavItems = navigationItems.filter(item => item.title !== "Search");

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  const handleSearchClick = () => {
    if (!isMobile) {
      toggleSearchPanel();
    }
  };

  return (
    <SidebarMenu className="space-y-2">
      {searchItem && (
        <SidebarMenuItem>
          {isMobile ? (
            <Link href={searchItem.url}>
              <SidebarMenuButton
                tooltip={searchItem.title}
                className={cn(
                  "relative py-5 px-3 rounded-xl text-left justify-start",
                  "hover:bg-gray-50 transition-all duration-200",
                  "group"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <searchItem.icon className="h-7 w-7 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-lg font-medium">{searchItem.title}</span>
                </div>
              </SidebarMenuButton>
            </Link>
          ) : (
            <SidebarMenuButton
              tooltip={searchItem.title}
              className={cn(
                "relative py-5 px-3 rounded-xl text-left justify-start",
                "hover:bg-gray-50 transition-all duration-200",
                "group cursor-pointer"
              )}
              onClick={handleSearchClick}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="relative">
                  <searchItem.icon className="h-7 w-7 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-lg font-medium">{searchItem.title}</span>
              </div>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      )}

      {otherNavItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link href={item.url} onClick={closeSearchPanel}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={isActive(item.url)}
              className={cn(
                "relative py-5 px-3 rounded-xl text-left justify-start",
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
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="ml-auto h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500 hover:bg-red-600"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}