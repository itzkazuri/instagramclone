'use client';

import { 
  Users, 
  Image, 
  MessageCircle, 
  Calendar, 
  Flag,
  TrendingUp
} from 'lucide-react';
import { useDashboard } from '@/hooks/admin/useDashboard';

const statIcons = {
  totalUsers: Users,
  totalPosts: Image,
  totalComments: MessageCircle,
  totalEvents: Calendar,
  pendingReports: Flag,
};

const statTitles = {
  totalUsers: 'Total Users',
  totalPosts: 'Total Posts',
  totalComments: 'Total Comments',
  totalEvents: 'Total Events',
  pendingReports: 'Pending Reports',
};

export function DashboardStats() {
  const { stats, loading, error, refresh } = useDashboard();

  if (error) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="text-center text-red-500">
          Error loading dashboard stats: {error}
          <button 
            onClick={refresh} 
            className="ml-4 text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {Object.entries(stats).map(([key, value]) => {
        const Icon = statIcons[key as keyof typeof statIcons];
        const title = statTitles[key as keyof typeof statTitles];
        
        return (
          <div 
            key={key} 
            className="rounded-xl border bg-card text-card-foreground shadow"
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">{title}</p>
                {loading ? (
                  <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
                )}
              </div>
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0% from last month
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}