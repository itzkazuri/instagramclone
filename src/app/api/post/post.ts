import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError, validateRequiredFields } from '@/lib/api/utils';

const prisma = new PrismaClient();

// POST /api/post - Create a new post
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, character, series, costume, media, isPublic = true } = body;

    // Validasi input
    const validationError = validateRequiredFields(body, ['content']);
    if (validationError) {
      return NextResponse.json(
        createApiError(validationError, 400),
        { status: 400 }
      );
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        authorId: user.userId,
        content,
        character,
        series,
        costume,
        isPublic,
        media: media ? {
          create: media.map((item: any) => ({
            url: item.url,
            type: item.type,
            altText: item.altText,
            width: item.width,
            height: item.height
          }))
        } : undefined
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

    // Update user's post count
    await prisma.user.update({
      where: { id: user.userId },
      data: {
        postsCount: {
          increment: 1
        }
      }
    });

    return NextResponse.json(
      createApiResponse(post, 'Post created successfully'),
      { status: 201 }
    );

  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}