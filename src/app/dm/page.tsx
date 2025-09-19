'use client';

import { useState } from 'react';
import { ConversationList } from '@/components/dm/ConversationList';
import { MessagePanel } from '@/components/dm/MessagePanel';
import { DUMMY_CONVERSATIONS, DUMMY_MESSAGES } from '@/lib/dummy-data';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function DirectMessagePage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    DUMMY_CONVERSATIONS[0]?.id || null
  );

  const selectedConversation = DUMMY_CONVERSATIONS.find(
    (c) => c.id === selectedConversationId
  );

  const messages = selectedConversationId ? DUMMY_MESSAGES[selectedConversationId] || [] : [];

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-4rem)] w-full rounded-lg border">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <ConversationList
          conversations={DUMMY_CONVERSATIONS}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        {selectedConversation ? (
          <MessagePanel conversation={selectedConversation} messages={messages} />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted/30">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Select a Message</h2>
              <p className="text-muted-foreground">Choose from your existing conversations, start a new one, and enjoy your day.</p>
            </div>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
