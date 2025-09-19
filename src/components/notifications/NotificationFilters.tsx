'use client';

import { Button } from '@/components/ui/button';
import { 
  Heart, 
  UserPlus, 
  MessageCircle, 
  AtSign,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationFilter = 'all' | 'follows' | 'likes' | 'comments' | 'mentions';

const filterOptions = [
  { id: 'all', label: 'All', icon: Filter },
  { id: 'follows', label: 'Follows', icon: UserPlus },
  { id: 'likes', label: 'Likes', icon: Heart },
  { id: 'comments', label: 'Comments', icon: MessageCircle },
  { id: 'mentions', label: 'Mentions', icon: AtSign },
];

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
}

export function NotificationFilters({ activeFilter, onFilterChange }: NotificationFiltersProps) {
  return (
    <div className="flex overflow-x-auto px-4 py-2 hide-scrollbar">
      {filterOptions.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? 'default' : 'ghost'}
            size="sm"
            className="flex-shrink-0 mr-2 rounded-full"
            onClick={() => onFilterChange(filter.id as NotificationFilter)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}