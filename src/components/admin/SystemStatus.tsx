'use client';

export function SystemStatus() {
  // In a real application, you would fetch this data from an API
  const systemStatus = [
    { name: 'Database', status: 'online', message: 'Operational' },
    { name: 'API Server', status: 'online', message: 'Operational' },
    { name: 'Storage', status: 'warning', message: '85% Full' },
    { name: 'Backup', status: 'online', message: 'Up to date' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="space-y-4">
          {systemStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{item.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                {item.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}