'use client';

import { Filter } from 'lucide-react';

interface EmptyNotificationsProps {
  filter: string;
}

export function EmptyNotifications({ filter }: EmptyNotificationsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Filter className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No notifications
      </h3>
      <p className="text-gray-500 text-center">
        {filter === 'all' 
          ? "You don't have any notifications yet." 
          : `You don't have any ${filter} notifications.`}
      </p>
    </div>
  );
}