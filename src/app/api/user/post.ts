import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError, validateRequiredFields } from '@/lib/api/utils';

const prisma = new PrismaClient();

// POST /api/user - Create user (register)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, cosplayerName } = body;

    // Validasi input
    const validationError = validateRequiredFields(body, ['username', 'email', 'password']);
    if (validationError) {
      return NextResponse.json(
        createApiError(validationError, 400),
        { status: 400 }
      );
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        createApiError('User with this email or username already exists', 409),
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        slug: username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'),
        cosplayerName: cosplayerName || username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        cosplayerName: true,
        createdAt: true,
      }
    });

    return NextResponse.json(
      createApiResponse(user, 'User created successfully'),
      { status: 201 }
    );

  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Import hashPassword from auth utils
async function hashPassword(password: string): Promise<string> {
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}