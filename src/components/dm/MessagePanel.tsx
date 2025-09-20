import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Conversation, Message } from '@/lib/dummy-data';

interface MessagePanelProps {
  conversation: Conversation;
  messages: Message[];
}

export function MessagePanel({ conversation, messages }: MessagePanelProps) {
  return (
    <div className="flex h-full flex-col w-full">
      <ScrollArea className="flex-1 p-4 pb-20"> {/* Added pb-20 to ensure message input is visible */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t absolute bottom-16 left-0 right-0 bg-white"> {/* Positioned absolutely above navbar */}
        <MessageInput />
      </div>
    </div>
  );
}
