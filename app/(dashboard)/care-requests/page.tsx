'use client'

import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mockRequests = [
  {
    id: 1,
    patient: 'John Doe',
    guardian: 'John Smith',
    careType: 'Personal Care',
    priority: 'high',
    startDate: '2024-03-01',
    hoursPerWeek: 40,
    status: 'active',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    guardian: 'Mary Johnson',
    careType: 'Medical',
    priority: 'urgent',
    startDate: '2024-02-28',
    hoursPerWeek: 24,
    status: 'active',
  },
  {
    id: 3,
    patient: 'Robert Brown',
    guardian: 'Robert Williams',
    careType: 'Companion Care',
    priority: 'normal',
    startDate: '2024-03-05',
    hoursPerWeek: 20,
    status: 'pending',
  },
]

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  normal: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function CareRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = mockRequests.filter(
    (request) =>
      request.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.guardian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.careType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Care Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track care requests from guardians
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
          placeholder="Search by patient, guardian, or care type..."
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
                  Patient
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Guardian
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Care Type
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Priority
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Hours/Week
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
                    <td className="py-3 px-6 font-medium">{request.patient}</td>
                    <td className="py-3 px-6 text-muted-foreground">
                      {request.guardian}
                    </td>
                    <td className="py-3 px-6">{request.careType}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          priorityColors[request.priority]
                        }`}
                      >
                        {request.priority.charAt(0).toUpperCase() +
                          request.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6">{request.hoursPerWeek}</td>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No care requests found matching your search
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
