import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// GET /api/user - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const userProfile = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        username: true,
        email: true,
        cosplayerName: true,
        slug: true,
        bio: true,
        avatar: true,
        specializations: true,
        location: true,
        isVerified: true,
        socialLinks: true,
        followersCount: true,
        followingCount: true,
        postsCount: true,
        createdAt: true,
        lastLoginAt: true,
      }
    });

    if (!userProfile) {
      return NextResponse.json(
        createApiError('User not found', 404),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createApiResponse(userProfile, 'User profile retrieved successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Get user profile error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}