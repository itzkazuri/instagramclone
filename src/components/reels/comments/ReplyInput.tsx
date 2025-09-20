'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DUMMY_USER_PROFILE } from '@/lib/dummy-posts';

interface ReplyInputProps {
  onSubmit: (content: string) => void;
}

export function ReplyInput({ onSubmit }: ReplyInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={DUMMY_USER_PROFILE.avatar} alt={DUMMY_USER_PROFILE.username} />
        <AvatarFallback>{DUMMY_USER_PROFILE.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 flex gap-2">
        <Textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[40px] flex-1 resize-none text-sm"
        />
        <Button 
          size="icon" 
          className="h-10 w-10 rounded-full"
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}