'use client'

import { Plus, Edit2, Trash2, Eye, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mockLeaveRequests = [
  {
    id: 1,
    caregiver: 'Sarah Johnson',
    leaveType: 'Vacation',
    startDate: '2024-03-10',
    endDate: '2024-03-17',
    reason: 'Family vacation',
    status: 'approved',
  },
  {
    id: 2,
    caregiver: 'Michael Brown',
    leaveType: 'Sick',
    startDate: '2024-03-08',
    endDate: '2024-03-09',
    reason: 'Flu',
    status: 'approved',
  },
  {
    id: 3,
    caregiver: 'Lisa Davis',
    leaveType: 'Personal',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    reason: 'Personal matters',
    status: 'pending',
  },
]

const leaveTypeColors: Record<string, string> = {
  vacation: 'bg-blue-100 text-blue-800',
  sick: 'bg-red-100 text-red-800',
  personal: 'bg-purple-100 text-purple-800',
  emergency: 'bg-orange-100 text-orange-800',
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export default function LeaveRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = mockLeaveRequests.filter(
    (request) =>
      request.caregiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage and approve caregiver leave requests
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search by caregiver name or leave type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Caregiver
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Start Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  End Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Reason
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right py-3 px-6 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium">{request.caregiver}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          leaveTypeColors[request.leaveType.toLowerCase()]
                        }`}
                      >
                        {request.leaveType}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {new Date(request.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-muted-foreground">
                      {request.reason}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[request.status]
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No leave requests found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
