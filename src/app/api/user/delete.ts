import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, createApiResponse, createApiError } from '@/lib/api/utils';

const prisma = new PrismaClient();

// DELETE /api/user - Delete current user account
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        createApiError('Unauthorized', 401),
        { status: 401 }
      );
    }

    // Delete user account
    await prisma.user.delete({
      where: { id: user.userId }
    });

    return NextResponse.json(
      createApiResponse(null, 'User account deleted successfully'),
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete user account error:', error);
    return NextResponse.json(
      createApiError('Internal server error', 500),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}