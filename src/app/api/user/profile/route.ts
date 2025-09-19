

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { withAuth } from '@/middleware/auth';

const prisma = new PrismaClient();

// GET /api/user/profile - Dapatkan profil user yang sedang login
export async function GET(request: NextRequest) {
  try {
    // Verifikasi token
    const authResponse = await withAuth(request, {} as any);
    if (authResponse) {
      return authResponse; // Return error response jika token tidak valid
    }

    // Dapatkan user ID dari headers
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in request' },
        { status: 500 }
      );
    }

    // Cari user berdasarkan ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        bio: true,
        avatar: true,
        cosplayerName: true,
        specializations: true,
        location: true,
        isVerified: true,
        socialLinks: true,
        followersCount: true,
        followingCount: true,
        postsCount: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user,
      message: 'Profile retrieved successfully'
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update profil user yang sedang login
export async function PUT(request: NextRequest) {
  try {
    // Verifikasi token
    const authResponse = await withAuth(request, {} as any);
    if (authResponse) {
      return authResponse; // Return error response jika token tidak valid
    }

    // Dapatkan user ID dari headers
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in request' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        bio: body.bio,
        cosplayerName: body.cosplayerName,
        specializations: body.specializations,
        location: body.location,
        socialLinks: body.socialLinks,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        bio: true,
        avatar: true,
        cosplayerName: true,
        specializations: true,
        location: true,
        isVerified: true,
        socialLinks: true,
        followersCount: true,
        followingCount: true,
        postsCount: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({
      user: updatedUser,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}