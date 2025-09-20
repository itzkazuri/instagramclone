import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../auth';

// Type definitions
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type HandlerFunction = (req: NextRequest, context: { params: Record<string, string> }) => Promise<NextResponse>;

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Standardized API Response Helper
export function createApiResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message
  };
}

export function createApiError(message: string, status: number = 400): ApiResponse<null> {
  return {
    success: false,
    error: message
  };
}

// Authentication Helper - Updated to work with middleware
export async function requireAuth(request: NextRequest) {
  // Check if user info is attached by middleware
  const userId = request.headers.get('x-user-id');
  const userRole = request.headers.get('x-user-role');
  
  if (!userId || !userRole) {
    // Fallback to token verification if middleware didn't attach user info
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    return await verifyToken(token);
  }
  
  return {
    userId,
    role: userRole
  };
}

// Validation Helper
export function validateRequiredFields(obj: Record<string, any>, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!obj[field] || obj[field].toString().trim() === '') {
      return `Field '${field}' is required`;
    }
  }
  return null;
}

// Route Handler Factory
export function createRouteHandler(handlers: Partial<Record<HttpMethod, HandlerFunction>>) {
  return async (request: NextRequest, context: { params: Record<string, string> }) => {
    const method = request.method as HttpMethod;
    
    const handler = handlers[method];
    if (!handler) {
      return NextResponse.json(
        createApiError(`Method ${method} not allowed`, 405),
        { status: 405 }
      );
    }

    try {
      return await handler(request, context);
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json(
        createApiError('Internal server error', 500),
        { status: 500 }
      );
    }
  };
}