'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CommentList } from './CommentList';
import { ReplyInput } from './ReplyInput';
import { Comment } from '@/types';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommentSheetProps {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (content: string) => void;
}

export function CommentSheet({ comments, isOpen, onClose, onAddComment }: CommentSheetProps) {
  const handleSubmit = (content: string) => {
    onAddComment(content);
  };

  return (
    <>
      {/* Desktop version - Side panel */}
      <div className="hidden md:block">
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <SheetContent 
            side="right" 
            className="w-full sm:w-[540px] p-0 flex flex-col"
            onInteractOutside={onClose}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Comments</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <CommentList comments={comments} className="flex-1" />
              <div className="p-4 border-t">
                <ReplyInput onSubmit={handleSubmit} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile version - Swipeable card like Instagram/TikTok */}
      <div className="md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 pointer-events-none"
            >
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 pointer-events-auto"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              
              {/* Swipeable card */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] flex flex-col pointer-events-auto"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) {
                    onClose();
                  }
                }}
              >
                {/* Drag handle */}
                <div className="flex justify-center p-2">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>
                
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Comments</h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  <CommentList comments={comments} className="flex-1" />
                  <div className="p-4 border-t">
                    <ReplyInput onSubmit={handleSubmit} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}