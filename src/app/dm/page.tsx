'use client';

import { useState, useEffect } from 'react';
import { ConversationList } from '@/components/dm/ConversationList';
import { MessagePanel } from '@/components/dm/MessagePanel';
import { DUMMY_CONVERSATIONS, DUMMY_MESSAGES } from '@/lib/dummy-data';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DirectMessagePage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if we're on mobile and handle conversation selection from URL
  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);
    
    // Check if there's a conversation ID in the URL
    const conversationId = searchParams.get('conversation');
    if (conversationId) {
      setSelectedConversationId(conversationId);
    } else if (!mobileCheck && DUMMY_CONVERSATIONS.length > 0) {
      // On desktop, auto-select the first conversation if none is selected
      setSelectedConversationId(DUMMY_CONVERSATIONS[0]?.id || null);
    }
  }, [searchParams]);

  const selectedConversation = DUMMY_CONVERSATIONS.find(
    (c) => c.id === selectedConversationId
  );

  const messages = selectedConversationId ? DUMMY_MESSAGES[selectedConversationId] || [] : [];

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    // On mobile, update the URL to show the conversation
    if (isMobile) {
      router.push(`/dm?conversation=${id}`);
    }
  };

  const handleBackToConversations = () => {
    setSelectedConversationId(null);
    if (isMobile) {
      router.push('/dm');
    }
  };

  // On mobile, show either the conversation list or the message panel
  if (isMobile) {
    if (selectedConversationId && selectedConversation) {
      return (
        <div className="h-screen w-full flex flex-col pb-16"> {/* Added pb-16 to account for navbar */}
          {/* Mobile header with back button */}
          <div className="flex items-center p-4 border-b">
            <Button variant="ghost" size="icon" onClick={handleBackToConversations} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <img 
                src={selectedConversation.avatar} 
                alt={selectedConversation.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
              <h2 className="text-lg font-semibold">{selectedConversation.name}</h2>
            </div>
          </div>
          
          {/* Message panel */}
          <div className="flex-1 overflow-hidden">
            <MessagePanel conversation={selectedConversation} messages={messages} />
          </div>
        </div>
      );
    }
    
    return (
      <div className="h-screen w-full pb-16"> {/* Added pb-16 to account for navbar */}
        <ConversationList
          conversations={DUMMY_CONVERSATIONS}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>
    );
  }

  // On desktop, show the resizable panels
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-4rem)] w-full rounded-lg border">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <ConversationList
          conversations={DUMMY_CONVERSATIONS}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
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
