// src/app/admin/admin-layout-client.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AdminLayoutClient({ 
  children,
  sidebar
}: { 
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Fungsi untuk memverifikasi token
  const verifyToken = (token: string) => {
    try {
      // Decode token untuk memeriksa apakah valid dan role admin
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'ADMIN';
    } catch (e) {
      // Token tidak valid
      return false;
    }
  };

  useEffect(() => {
    // Cek token admin dari cookies
    const adminToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-token='))
      ?.split('=')[1];
    
    console.log('Token found in cookie:', adminToken); // Untuk debugging
    
    if (adminToken) {
      const authenticated = verifyToken(adminToken);
      setIsAuthenticated(authenticated);
      console.log('Token authenticated:', authenticated); // Untuk debugging
      
      // Jika terautentikasi dan bukan di halaman login, redirect ke admin
      if (authenticated && pathname === '/admin/login') {
        console.log('Redirecting to admin dashboard'); // Untuk debugging
        router.push('/admin');
      }
    } else {
      setIsAuthenticated(false);
    }
    
    // Tambahkan pengecekan tambahan setelah beberapa detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, router]);

  // Effect terpisah untuk redirect
  useEffect(() => {
    // Jika tidak terautentikasi dan bukan di halaman login, redirect ke login
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      console.log('Redirecting to login'); // Untuk debugging
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router, isLoading]);

  // Jika sedang loading, tampilkan placeholder
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Jika tidak terautentikasi dan bukan di halaman login, jangan tampilkan sidebar
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex h-full items-center justify-center">
          <div>Redirecting to login...</div>
        </div>
      </div>
    );
  }

  // Jika di halaman login, jangan tampilkan sidebar
  if (pathname === '/admin/login') {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {children}
      </div>
    );
  }

  // Untuk halaman admin yang terautentikasi, tampilkan dengan sidebar
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="hidden md:block">
        {sidebar}
      </div>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}