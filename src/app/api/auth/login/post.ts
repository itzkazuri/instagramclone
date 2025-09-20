import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword, generateToken } from '@/lib/auth';
import { createApiResponse, createApiError, validateRequiredFields } from '@/lib/api/utils';

const prisma = new PrismaClient();

// POST /api/auth/login - Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    const validationError = validateRequiredFields(body, ['email', 'password']);
    if (validationError) {
      return NextResponse.json(
        createApiError(validationError, 400),
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        createApiError('Invalid credentials', 401),
        { status: 401 }
      );
    }

    // Verifikasi password
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        createApiError('Invalid credentials', 401),
        { status: 401 }
      );
    }

    // Generate token dengan informasi tambahan
    const token = await generateToken(user.id, user.role, user.username, user.cosplayerName);

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    return NextResponse.json(
      createApiResponse({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          cosplayerName: user.cosplayerName,
        },
        token
      }, 'Login successful'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}