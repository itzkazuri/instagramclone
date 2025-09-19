import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/dashboard - Get dashboard statistics
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

    // Get statistics
    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalEvents,
      pendingReports,
      recentReports
    ] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.comment.count(),
      prisma.event.count(),
      prisma.report.count({ where: { status: 'pending' } }),
      prisma.report.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          reporter: {
            select: {
              username: true,
              cosplayerName: true,
            }
          },
        }
      })
    ]);

    // Transform recent reports
    const transformedReports = recentReports.map(report => ({
      id: report.id,
      type: report.postId ? 'Post' : report.userId ? 'User' : 'Comment',
      reason: report.reason,
      reporter: {
        username: report.reporter.username,
        cosplayerName: report.reporter.cosplayerName,
      },
      status: report.status,
      createdAt: report.createdAt,
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalPosts,
        totalComments,
        totalEvents,
        pendingReports,
      },
      recentReports: transformedReports,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}