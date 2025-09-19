import { cn } from '@/lib/utils';
import { Message } from '@/lib/dummy-data';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const bubbleClasses = cn(
    'p-3 rounded-lg max-w-xs lg:max-w-md',
    message.isSender
      ? 'bg-primary text-primary-foreground self-end'
      : 'bg-muted self-start'
  );

  const wrapperClasses = cn(
    'flex flex-col',
    message.isSender ? 'items-end' : 'items-start'
  );

  return (
    <div className={wrapperClasses}>
      <div className={bubbleClasses}>
        <p>{message.text}</p>
      </div>
      <span className="text-xs text-muted-foreground mt-1 px-1">
        {message.timestamp}
      </span>
    </div>
  );
}
