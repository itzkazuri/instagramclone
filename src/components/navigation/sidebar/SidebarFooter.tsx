'use client';

import { 
  SidebarMenu, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, MoreHorizontal } from "lucide-react";

const mockUser = {
  name: "Sakura Cosplay",
  username: "@sakura_cosplay",
  avatar: "/current-user-avatar.png",
  isVerified: true,
};

export function SidebarFooter() {
  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
            <Avatar className="h-11 w-11 ring-2 ring-gray-200">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="text-base font-semibold">SC</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="truncate font-bold text-base text-gray-900">
                  {mockUser.name}
                </span>
                {mockUser.isVerified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <span className="truncate text-sm text-gray-500">{mockUser.username}</span>
            </div>
            <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </SidebarMenuItem>
        
        <Separator className="my-3" />
        
        <SidebarMenuItem>
          <Button
            variant="ghost"
            className="w-full justify-start py-5 px-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="h-7 w-7 mr-3 transition-transform group-hover:scale-110" />
            <span className="text-lg font-medium">Log out</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}