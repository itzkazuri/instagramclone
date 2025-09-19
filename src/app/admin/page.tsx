// src/app/admin/page.tsx
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RecentReports } from '@/components/admin/RecentReports';
import { SystemStatus } from '@/components/admin/SystemStatus';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4 p-6 md:ml-64">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-4 md:grid-cols-2">
        <RecentReports />
        <SystemStatus />
      </div>
    </div>
  );
}