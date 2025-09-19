// src/components/admin/sidebar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Image, 
  MessageCircle, 
  Calendar, 
  Flag, 
  Settings,
  LogOut,
  User,
  Reply
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/posts', label: 'Posts', icon: Image },
  { href: '/admin/comments', label: 'Comments', icon: MessageCircle },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/reports', label: 'Reports', icon: Flag },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{username: string, cosplayerName: string} | null>(null);
  
  useEffect(() => {
    // Dapatkan informasi admin dari token
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-token='))
      ?.split('=')[1];
    
    if (token) {
      try {
        // Decode token untuk mendapatkan informasi user
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAdminUser({
          username: payload.username || 'admin',
          cosplayerName: payload.cosplayerName || 'Admin User'
        });
      } catch (e) {
        // Jika token tidak valid, redirect ke login
        handleLogout();
      }
    }
  }, []);
  
  const handleLogout = () => {
    // Hapus token admin dari cookies
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirect ke halaman login
    router.push('/admin/login');
  };
  
  return (
    <div className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{adminUser?.cosplayerName || 'Admin User'}</span>
              <span className="text-xs text-muted-foreground">@{adminUser?.username || 'admin'}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary w-full mt-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}