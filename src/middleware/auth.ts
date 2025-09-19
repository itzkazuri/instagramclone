import { NextRequest, NextFetchEvent } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Tipe untuk user dalam request
export type AuthenticatedUser = {
  userId: string;
  role: string;
};

// Middleware untuk melindungi route API
export async function withAuth(
  request: NextRequest,
  event: NextFetchEvent,
  requiredRole?: string
): Promise<Response | null> {
  // Dapatkan token dari header Authorization
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Missing or invalid authorization header' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Ekstrak token
  const token = authHeader.substring(7); // Hilangkan "Bearer "
  
  // Verifikasi token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return new Response(
      JSON.stringify({ error: 'Invalid or expired token' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Jika ada role requirement, cek apakah user memiliki role yang sesuai
  if (requiredRole && decoded.role !== requiredRole) {
    return new Response(
      JSON.stringify({ error: 'Insufficient permissions' }), 
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Tambahkan user info ke request headers untuk digunakan di route handler
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId);
  requestHeaders.set('x-user-role', decoded.role);

  // Buat request baru dengan headers yang sudah dimodifikasi
  const newRequest = new NextRequest(request, {
    headers: requestHeaders,
  });

  // Return null untuk menandakan bahwa request bisa dilanjutkan
  return null;
}

// Middleware khusus untuk admin
export async function withAdminAuth(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | null> {
  return withAuth(request, event, 'ADMIN');
}

// Middleware khusus untuk user (termasuk admin)
export async function withUserAuth(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | null> {
  return withAuth(request, event);
}