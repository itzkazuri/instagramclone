import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// PATCH /api/user - Partially update current user profile
export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Only allow specific fields to be updated
    const allowedFields = ['cosplayerName', 'bio', 'location', 'socialLinks', 'avatar'];
    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: updateData,
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
    console.error('Patch user profile error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}