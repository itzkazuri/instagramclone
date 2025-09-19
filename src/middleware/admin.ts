// src/middleware/admin.ts
import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Fungsi untuk memverifikasi apakah user adalah admin
export async function withAdminAuth(request: NextRequest) {
  // Dapatkan token dari cookies atau headers
  const token = request.cookies.get('admin-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  
  // Verifikasi token dengan JWT
  const decoded = verifyToken(token);
  
  // Cek apakah token valid dan user memiliki role admin
  if (!decoded || decoded.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  
  // Jika token valid dan user adalah admin, izinkan akses
  return null;
}