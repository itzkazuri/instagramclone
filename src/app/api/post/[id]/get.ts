import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// GET /api/post/[id] - Get a specific post by ID
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        createApiError('Post ID is required', 400),
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { 
        id,
        OR: [
          { isPublic: true },
          { authorId: user.userId }
        ]
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            cosplayerName: true,
            avatar: true,
            isVerified: true,
            followersCount: true,
            followingCount: true,
            postsCount: true
          }
        },
        media: {
          select: {
            id: true,
            url: true,
            type: true,
            altText: true,
            width: true,
            height: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        createApiError('Post not found', 404),
        { status: 404 }
      );
    }

    // Add computed fields
    const postWithComputed = {
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments
    };

    return NextResponse.json(
      createApiResponse(postWithComputed, 'Post retrieved successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}