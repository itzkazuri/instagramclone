import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/reports - Get all reports with pagination
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
        { reason: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { reporter: { 
          OR: [
            { username: { contains: search, mode: 'insensitive' } },
            { cosplayerName: { contains: search, mode: 'insensitive' } }
          ]
        } },
      ];
    }

    if (status) {
      where.status = status;
    }

    // Get reports - removed invalid includes
    const reports = await prisma.report.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        reporter: {
          select: {
            username: true,
            cosplayerName: true,
          }
        },
        reviewedBy: {
          select: {
            username: true,
          }
        }
      }
    });

    // Get total count
    const total = await prisma.report.count({ where });

    // Manually fetch related data and transform reports for response
    const transformedReports = await Promise.all(
      reports.map(async (report) => {
        // Fetch related post data if postId exists
        let postData = null;
        if (report.postId) {
          postData = await prisma.post.findUnique({
            where: { id: report.postId },
            select: { id: true, content: true }
          });
        }

        // Fetch related user data if userId exists (for user reports)
        let userData = null;
        if (report.userId) {
          userData = await prisma.user.findUnique({
            where: { id: report.userId },
            select: { id: true, username: true }
          });
        }

        // Fetch related comment data if commentId exists
        let commentData = null;
        if (report.commentId) {
          commentData = await prisma.comment.findUnique({
            where: { id: report.commentId },
            select: { id: true, content: true }
          });
        }

        return {
          id: report.id,
          type: report.postId ? 'Post' : report.userId ? 'User' : 'Comment',
          reason: report.reason,
          description: report.description,
          reporter: {
            username: report.reporter.username,
            cosplayerName: report.reporter.cosplayerName,
          },
          status: report.status,
          reviewedBy: report.reviewedBy?.username || null,
          reviewedAt: report.reviewedAt,
          createdAt: report.createdAt,
          // Include related data
          post: postData,
          user: userData,
          comment: commentData,
        };
      })
    );

    return NextResponse.json({
      reports: transformedReports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/reports/[id] - Update report status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const reportId = params.id;
    const { status } = await request.json();

    // Validate status
    if (!['pending', 'reviewed', 'resolved'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Update report
    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: {
        status,
        reviewedById: decoded.userId,
        reviewedAt: new Date(),
      },
      include: {
        reporter: {
          select: {
            username: true,
            cosplayerName: true,
          }
        },
        reviewedBy: {
          select: {
            username: true,
          }
        },
      }
    });

    return NextResponse.json({
      report: {
        id: updatedReport.id,
        type: updatedReport.postId ? 'Post' : updatedReport.userId ? 'User' : 'Comment',
        reason: updatedReport.reason,
        description: updatedReport.description,
        reporter: {
          username: updatedReport.reporter.username,
          cosplayerName: updatedReport.reporter.cosplayerName,
        },
        status: updatedReport.status,
        reviewedBy: updatedReport.reviewedBy?.username || null,
        reviewedAt: updatedReport.reviewedAt,
        createdAt: updatedReport.createdAt,
      }
    });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}