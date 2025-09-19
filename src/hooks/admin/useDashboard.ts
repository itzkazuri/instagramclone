import { useState, useEffect } from 'react';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalEvents: number;
  pendingReports: number;
}

interface RecentReport {
  id: string;
  type: string;
  reason: string;
  reporter: {
    username: string;
    cosplayerName: string | null;
  };
  status: string;
  createdAt: string;
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalEvents: 0,
    pendingReports: 0,
  });
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get admin token from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No admin token found');
      }

      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setStats(data.stats);
      setRecentReports(data.recentReports);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    recentReports,
    loading,
    error,
    refresh: fetchDashboardData,
  };
};