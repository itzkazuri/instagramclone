'use client';

import { useState } from 'react';
import { 
  Search, 
  MoreHorizontal,
  Eye,
  Trash2,
  MessageSquare,
  Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useComments } from '@/hooks/admin/useComments';
import { formatDate } from '@/lib/utils';

export function CommentsTable() {
  const {
    comments,
    pagination,
    loading,
    error,
    search,
    setSearch,
    setPage,
    deleteComment,
    refresh
  } = useComments(1, 10);

  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const handleDeleteComment = async (commentId: string) => {
    try {
      setDeletingCommentId(commentId);
      await deleteComment(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      setDeletingCommentId(null);
    }
  };

  if (error) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="text-center text-red-500">
          Error loading comments: {error}
          <Button onClick={refresh} className="ml-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">Comments Management</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search comments..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="font-medium max-w-xs truncate">
                        {comment.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {comment.author.cosplayerName || comment.author.username}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        @{comment.author.username}
                      </div>
                    </TableCell>
                    <TableCell>
                      {comment.post ? (
                        <div>
                          <div className="font-medium max-w-xs truncate">
                            {comment.post.content || 'No content'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Post ID: {comment.post.id}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No post</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {comment.parent ? (
                        <div className="flex items-center gap-1">
                          <Reply className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Reply</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Comment</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(comment.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={deletingCommentId === comment.id}
                          >
                            {deletingCommentId === comment.id ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent"></div>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {comments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No comments found
              </div>
            )}

            {pagination.pages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing page {pagination.page} of {pagination.pages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}