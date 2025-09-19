import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Daftar route yang memerlukan authentication
const protectedRoutes = [
  '/api/user',
  '/api/post',
  '/api/media',
  '/api/story',
  '/api/comment',
  '/api/like',
  '/api/follow',
  '/api/message',
  '/api/event',
];

// Daftar route yang memerlukan role admin
const adminRoutes = [
  '/admin',
  '/api/admin',
  '/api/report',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cek apakah route memerlukan authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Jika bukan route yang dilindungi, lanjutkan tanpa middleware
  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }
  
  // Untuk route admin (kecuali login page), cek token admin
  if (isAdminRoute && !pathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin-token')?.value;
    
    if (!adminToken) {
      // Redirect ke login page jika tidak ada token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Verifikasi token dengan JWT
    const decoded = await verifyToken(adminToken);
    
    // Cek apakah token valid dan user memiliki role admin
    if (!decoded || decoded.role !== 'ADMIN') {
      // Redirect ke login page jika token tidak valid atau bukan admin
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Untuk route user yang dilindungi, cek token user
  if (isProtectedRoute && !isAdminRoute) {
    const userToken = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!userToken) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Verifikasi token dengan JWT
    const decoded = await verifyToken(userToken);
    
    if (!decoded) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
  return NextResponse.next();
}

// Konfigurasi middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};