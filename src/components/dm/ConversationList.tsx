import { ConversationListItem } from './ConversationListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Conversation } from '@/lib/dummy-data';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({ conversations, selectedConversationId, onSelectConversation }: ConversationListProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Messages</h2>
        <div className="mt-2">
            <Input placeholder="Search messages..." />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {conversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conversation={conv}
              isSelected={conv.id === selectedConversationId}
              onClick={() => onSelectConversation(conv.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
