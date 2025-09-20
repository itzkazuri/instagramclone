import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// PATCH /api/post/[id] - Update a specific post by ID
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
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

    const body = await request.json();
    const { content, character, series, costume, isPublic } = body;

    // Check if post exists and belongs to user
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json(
        createApiError('Post not found', 404),
        { status: 404 }
      );
    }

    if (post.authorId !== user.userId) {
      return NextResponse.json(
        createApiError('Forbidden: You can only update your own posts', 403),
        { status: 403 }
      );
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        content,
        character,
        series,
        costume,
        isPublic,
        updatedAt: new Date()
      },
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
        }
      }
    });

    return NextResponse.json(
      createApiResponse(updatedPost, 'Post updated successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}