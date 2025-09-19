// src/app/admin/posts/page.tsx
import { PostsTable } from '@/components/admin/PostsTable';

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-4 p-6 md:ml-64">
      <PostsTable />
    </div>
  );
}