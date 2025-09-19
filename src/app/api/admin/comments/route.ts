import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/comments - Get all comments with pagination
export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Missing authorization token' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { content: { contains: search, mode: 'insensitive' } },
        { author: { 
          OR: [
            { username: { contains: search, mode: 'insensitive' } },
            { cosplayerName: { contains: search, mode: 'insensitive' } }
          ]
        } },
        { post: {
          content: { contains: search, mode: 'insensitive' }
        }},
      ];
    }

    // Get comments
    const comments = await prisma.comment.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        author: {
          select: {
            username: true,
            cosplayerName: true,
          }
        },
        post: {
          select: {
            id: true,
            content: true,
          }
        },
        parent: {
          select: {
            id: true,
            content: true,
          }
        },
      }
    });

    // Get total count
    const total = await prisma.comment.count({ where });

    // Transform comments for response
    const transformedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      author: {
        username: comment.author.username,
        cosplayerName: comment.author.cosplayerName,
      },
      post: {
        id: comment.post?.id,
        content: comment.post?.content,
      },
      parent: {
        id: comment.parent?.id,
        content: comment.parent?.content,
      },
      createdAt: comment.createdAt,
    }));

    return NextResponse.json({
      comments: transformedComments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/comments/[id] - Delete a comment
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify admin token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Missing authorization token' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const commentId = params.id;

    // Delete comment
    await prisma.comment.delete({
      where: { id: commentId }
    });

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}