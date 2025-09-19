import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Conversation } from '@/lib/dummy-data';

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationListItem({ conversation, isSelected, onClick }: ConversationListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center p-3 cursor-pointer hover:bg-muted/50',
        isSelected && 'bg-muted'
      )}
      onClick={onClick}
    >
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={conversation.avatar} alt={conversation.name} />
        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center">
            <h3 className="font-semibold">{conversation.name}</h3>
            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground truncate max-w-[180px]">{conversation.lastMessage}</p>
            {conversation.unreadCount > 0 && (
                <Badge className="w-5 h-5 flex items-center justify-center p-0">{conversation.unreadCount}</Badge>
            )}
        </div>
      </div>
    </div>
  );
}
