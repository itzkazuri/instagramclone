'use client';

import { Comment } from '@/types';
import { CommentItem } from './CommentItem';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommentListProps {
  comments: Comment[];
  className?: string;
}

export function CommentList({ comments, className }: CommentListProps) {
  return (
    <ScrollArea className={className}>
      <div className="space-y-4 p-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </ScrollArea>
  );
}