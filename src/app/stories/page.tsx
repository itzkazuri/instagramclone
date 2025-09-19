import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const StoryPage = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center space-x-2 mb-2">
          <Progress value={33} className="w-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">shadcn</span>
            <span className="text-gray-400 text-sm">12h</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white">
              <X />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src="https://via.placeholder.com/1080x1920" alt="Story" className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
};

export default StoryPage;
