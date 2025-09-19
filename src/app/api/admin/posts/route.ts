import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/posts - Get all posts with pagination
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
    const status = searchParams.get('status') || '';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { content: { contains: search, mode: 'insensitive' } },
        { character: { contains: search, mode: 'insensitive' } },
        { series: { contains: search, mode: 'insensitive' } },
        { author: { 
          OR: [
            { username: { contains: search, mode: 'insensitive' } },
            { cosplayerName: { contains: search, mode: 'insensitive' } }
          ]
        } },
      ];
    }

    if (status) {
      where.isPublic = status === 'published';
    }

    // Get posts
    const posts = await prisma.post.findMany({
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
        _count: {
          select: {
            likes: true,
            comments: true,
          }
        },
        media: {
          select: {
            id: true,
            url: true,
            type: true,
          }
        }
      }
    });

    // Get total count
    const total = await prisma.post.count({ where });

    // Transform posts for response
    const transformedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      character: post.character,
      series: post.series,
      author: {
        username: post.author.username,
        cosplayerName: post.author.cosplayerName,
      },
      likes: post._count.likes,
      comments: post._count.comments,
      mediaCount: post.media.length,
      isPublic: post.isPublic,
      createdAt: post.createdAt,
    }));

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[id] - Delete a post
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

    const postId = params.id;

    // Delete post
    await prisma.post.delete({
      where: { id: postId }
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}