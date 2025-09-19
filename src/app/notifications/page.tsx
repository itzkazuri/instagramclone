'use client';

import { useState } from 'react';
import { NotificationCard } from '@/components/notifications/NotificationCard';
import { NotificationFilters } from '@/components/notifications/NotificationFilters';
import { EmptyNotifications } from '@/components/notifications/EmptyNotifications';
import { DUMMY_NOTIFICATIONS } from '@/lib/dummy-data';

type NotificationFilter = 'all' | 'follows' | 'likes' | 'comments' | 'mentions';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');

  // Filter notifications based on active filter
  const filteredNotifications = DUMMY_NOTIFICATIONS.filter(notification => {
    if (activeFilter === 'all') return true;
    return notification.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          
          {/* Filter Tabs */}
          <NotificationFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard 
                key={notification.id} 
                notification={notification} 
              />
            ))
          ) : (
            <EmptyNotifications filter={activeFilter} />
          )}
        </div>
      </div>
    </div>
  );
}