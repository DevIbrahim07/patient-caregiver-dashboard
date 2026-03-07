'use client'

import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mockAssignments = [
  {
    id: 1,
    patient: 'John Doe',
    caregiver: 'Sarah Johnson',
    startDate: '2024-03-01',
    endDate: null,
    shift: '8:00 AM - 4:00 PM',
    status: 'active',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    caregiver: 'Michael Brown',
    startDate: '2024-02-28',
    endDate: null,
    shift: '6:00 PM - 2:00 AM',
    status: 'active',
  },
  {
    id: 3,
    patient: 'Robert Brown',
    caregiver: 'Sarah Johnson',
    startDate: '2024-03-05',
    endDate: '2024-04-05',
    shift: '10:00 AM - 6:00 PM',
    status: 'pending',
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAssignments = mockAssignments.filter(
    (assignment) =>
      assignment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.caregiver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground mt-2">
            View and manage caregiver assignments to patients
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Assignment
        </Button>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search by patient or caregiver name..."
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
                  Caregiver
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Start Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  End Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Shift
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
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium">{assignment.patient}</td>
                    <td className="py-3 px-6">{assignment.caregiver}</td>
                    <td className="py-3 px-6">
                      {new Date(assignment.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      {assignment.endDate
                        ? new Date(assignment.endDate).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="py-3 px-6 text-muted-foreground">
                      {assignment.shift}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[assignment.status]
                        }`}
                      >
                        {assignment.status.charAt(0).toUpperCase() +
                          assignment.status.slice(1)}
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
                    No assignments found matching your search
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
