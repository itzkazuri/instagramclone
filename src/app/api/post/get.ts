import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// GET /api/post - Get posts (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const userId = url.searchParams.get('userId');

    // Get posts based on filter
    const whereClause = userId 
      ? { authorId: userId, isPublic: true }
      : { 
          author: {
            followers: {
              some: {
                followerId: user.userId
              }
            }
          },
          isPublic: true
        };

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            cosplayerName: true,
            avatar: true,
            isVerified: true
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

    // Add computed fields
    const postsWithComputed = posts.map(post => ({
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments
    }));

    return NextResponse.json(
      createApiResponse(postsWithComputed, 'Posts retrieved successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}