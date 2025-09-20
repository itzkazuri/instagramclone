import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// DELETE /api/follow - Unfollow a user
export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await requireAuth(request);
    if (!currentUser) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        createApiError('User ID is required', 400),
        { status: 400 }
      );
    }

    // Check if following
    const existingFollow = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.userId,
          followingId: userId
        }
      }
    });

    if (!existingFollow) {
      return NextResponse.json(
        createApiError('Not following this user', 400),
        { status: 400 }
      );
    }

    // Delete follow relationship
    await prisma.follower.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.userId,
          followingId: userId
        }
      }
    });

    // Update follower counts
    await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: {
          followersCount: {
            decrement: 1
          }
        }
      }),
      prisma.user.update({
        where: { id: currentUser.userId },
        data: {
          followingCount: {
            decrement: 1
          }
        }
      })
    ]);

    return NextResponse.json(
      createApiResponse(null, 'Successfully unfollowed user'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Unfollow user error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}