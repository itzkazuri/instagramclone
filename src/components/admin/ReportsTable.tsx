'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Check,
  X
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useReports } from '@/hooks/admin/useReports';
import { formatDate } from '@/lib/utils';

export function ReportsTable() {
  const {
    reports,
    pagination,
    loading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    updateReportStatus,
    refresh
  } = useReports(1, 10);

  const [updatingReportId, setUpdatingReportId] = useState<string | null>(null);

  // Handle the special empty value for the status filter
  const handleStatusChange = (value: string) => {
    setStatus(value === "__empty__" ? "" : value);
  };

  const handleUpdateStatus = async (reportId: string, newStatus: string) => {
    try {
      setUpdatingReportId(reportId);
      await updateReportStatus(reportId, newStatus);
    } catch (error) {
      console.error('Failed to update report status:', error);
    } finally {
      setUpdatingReportId(null);
    }
  };

  if (error) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="text-center text-red-500">
          Error loading reports: {error}
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
          <h2 className="text-2xl font-semibold">Reports Management</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={status || "__empty__"} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__empty__">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
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
                  <TableHead>Report</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="font-medium">{report.type}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{report.reason}</div>
                      <div className="text-sm text-muted-foreground max-w-xs truncate">
                        {report.description || 'No description'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {report.reporter.cosplayerName || report.reporter.username}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        @{report.reporter.username}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(report.createdAt)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                        report.status === 'reviewed' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(report.id, 'reviewed')}
                            disabled={updatingReportId === report.id}
                          >
                            {updatingReportId === report.id ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                Updating...
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Reviewed
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(report.id, 'resolved')}
                            disabled={updatingReportId === report.id}
                          >
                            {updatingReportId === report.id ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                Updating...
                              </>
                            ) : (
                              <>
                                <X className="mr-2 h-4 w-4" />
                                Mark as Resolved
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

            {reports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No reports found
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