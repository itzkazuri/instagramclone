// src/app/admin/comments/page.tsx
import { CommentsTable } from '@/components/admin/CommentsTable';

export default function CommentsPage() {
  return (
    <div className="flex flex-col gap-4 p-6 md:ml-64">
      <CommentsTable />
    </div>
  );
}