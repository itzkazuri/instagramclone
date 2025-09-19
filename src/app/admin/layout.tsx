// src/app/admin/layout.tsx
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminLayoutClient } from './admin-layout-client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutClient sidebar={<AdminSidebar />}>
      {children}
    </AdminLayoutClient>
  );
}