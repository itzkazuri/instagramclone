// src/app/admin/users/page.tsx
import { UsersTable } from '@/components/admin/UsersTable';

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4 p-6 md:ml-64">
      <UsersTable />
    </div>
  );
}