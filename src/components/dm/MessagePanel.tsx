import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation, Message } from '@/lib/dummy-data';

interface MessagePanelProps {
  conversation: Conversation;
  messages: Message[];
}

export function MessagePanel({ conversation, messages }: MessagePanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{conversation.name}</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <MessageInput />
      </div>
    </div>
  );
}
