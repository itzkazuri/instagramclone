import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// POST /api/follow - Follow a user
export async function POST(request: NextRequest) {
  try {
    const currentUser = await requireAuth(request);
    if (!currentUser) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        createApiError('User ID is required', 400),
        { status: 400 }
      );
    }

    // Prevent users from following themselves
    if (currentUser.userId === userId) {
      return NextResponse.json(
        createApiError('You cannot follow yourself', 400),
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.userId,
          followingId: userId
        }
      }
    });

    if (existingFollow) {
      return NextResponse.json(
        createApiError('Already following this user', 400),
        { status: 400 }
      );
    }

    // Create follow relationship
    await prisma.follower.create({
      data: {
        followerId: currentUser.userId,
        followingId: userId
      }
    });

    // Update follower counts
    await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: {
          followersCount: {
            increment: 1
          }
        }
      }),
      prisma.user.update({
        where: { id: currentUser.userId },
        data: {
          followingCount: {
            increment: 1
          }
        }
      })
    ]);

    return NextResponse.json(
      createApiResponse(null, 'Successfully followed user'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Follow user error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}