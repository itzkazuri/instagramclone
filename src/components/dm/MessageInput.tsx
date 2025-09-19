import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Smile } from 'lucide-react';

export function MessageInput() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Handle message sending logic here
      }}
      className="flex items-center space-x-2"
    >
        <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
        </Button>
        <Input
            placeholder="Type a message..."
            className="flex-1"
            autoComplete="off"
        />
        <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
        </Button>
        <Button type="submit">Send</Button>
    </form>
  );
}
