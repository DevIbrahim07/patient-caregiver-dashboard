'use client'

import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mockCaregivers = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 111-2222',
    specialty: 'RN',
    license: 'RN-2024-001',
    availability: 'available',
    hourlyRate: 45,
    activeAssignments: 3,
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 222-3333',
    specialty: 'CNA',
    license: 'CNA-2024-005',
    availability: 'available',
    hourlyRate: 25,
    activeAssignments: 2,
  },
  {
    id: 3,
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@email.com',
    phone: '(555) 333-4444',
    specialty: 'LPN',
    license: 'LPN-2024-003',
    availability: 'on-leave',
    hourlyRate: 35,
    activeAssignments: 0,
  },
]

export default function CaregiversPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCaregivers = mockCaregivers.filter(
    (caregiver) =>
      caregiver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Caregivers</h1>
          <p className="text-muted-foreground mt-2">
            Manage caregivers, licenses, and assignments
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Caregiver
        </Button>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search caregivers by name or email..."
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
                  Name
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Specialty
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Availability
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Rate/Hour
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Active Assignments
                </th>
                <th className="text-right py-3 px-6 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCaregivers.length > 0 ? (
                filteredCaregivers.map((caregiver) => (
                  <tr
                    key={caregiver.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium">
                      {caregiver.firstName} {caregiver.lastName}
                    </td>
                    <td className="py-3 px-6 text-muted-foreground">
                      {caregiver.email}
                    </td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {caregiver.specialty}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          caregiver.availability === 'available'
                            ? 'bg-green-100 text-green-800'
                            : caregiver.availability === 'on-leave'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {caregiver.availability
                          .replace('-', ' ')
                          .split(' ')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </span>
                    </td>
                    <td className="py-3 px-6 font-medium">
                      ${caregiver.hourlyRate.toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {caregiver.activeAssignments}
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
                    No caregivers found matching your search
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
