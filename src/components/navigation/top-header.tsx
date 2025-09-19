'use client';

import { MessageCircle, Heart, Instagram, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSearch } from '@/context/SearchContext';

const mockUser = {
  name: 'Sakura Cosplay',
  username: '@sakura_cosplay',
  avatar: '/current-user-avatar.png',
};

export function TopHeader() {
  const { toggleSearchPanel } = useSearch();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Logo and Sidebar trigger */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center">
            <Instagram className="h-8 w-8 text-black" />
          </div>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:block flex-1 max-w-xs mx-4">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            onClick={toggleSearchPanel}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative hidden md:flex">
            <MessageCircle className="h-6 w-6" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-6 w-6" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
            >
              12
            </Badge>
          </Button>

          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={mockUser.avatar || '/placeholder.svg'} alt={mockUser.name} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
