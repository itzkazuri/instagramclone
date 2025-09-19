'use client';

import { Flag, Check, X } from 'lucide-react';
import { useDashboard } from '@/hooks/admin/useDashboard';
import { formatDate } from '@/lib/utils';

export function RecentReports() {
  const { recentReports, loading, error, refresh } = useDashboard();

  if (error) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="text-center text-red-500">
          Error loading recent reports: {error}
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
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
                <div className="h-6 w-16 bg-muted rounded-full"></div>
              </div>
            ))}
          </div>
        ) : recentReports.length > 0 ? (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {report.reporter.cosplayerName || report.reporter.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {report.type} - {report.reason}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(report.createdAt)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  report.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                  report.status === 'reviewed' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                }`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No recent reports
          </div>
        )}
      </div>
    </div>
  );
}