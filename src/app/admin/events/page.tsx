// src/app/admin/events/page.tsx
import { EventsTable } from '@/components/admin/EventsTable';

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-4 p-6 md:ml-64">
      <EventsTable />
    </div>
  );
}