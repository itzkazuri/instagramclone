import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// PUT /api/user - Update current user profile
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cosplayerName, bio, location, socialLinks, avatar } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: {
        cosplayerName,
        bio,
        location,
        socialLinks,
        avatar,
      },
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
      }
    });

    return NextResponse.json(
      createApiResponse(updatedUser, 'User profile updated successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Update user profile error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}