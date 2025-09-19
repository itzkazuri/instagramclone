// src/app/admin/reports/page.tsx
import { ReportsTable } from '@/components/admin/ReportsTable';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 p-6 md:ml-64">
      <ReportsTable />
    </div>
  );
}