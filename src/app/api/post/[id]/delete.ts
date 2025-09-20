import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// DELETE /api/post/[id] - Delete a specific post by ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
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
        createApiError('Forbidden: You can only delete your own posts', 403),
        { status: 403 }
      );
    }

    // Delete post
    await prisma.post.delete({
      where: { id }
    });

    // Update user's post count
    await prisma.user.update({
      where: { id: user.userId },
      data: {
        postsCount: {
          decrement: 1
        }
      }
    });

    return NextResponse.json(
      createApiResponse(null, 'Post deleted successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}