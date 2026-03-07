'use client'

import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mockGuardians = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    relationship: 'Son',
    status: 'active',
    patients: 2,
  },
  {
    id: 2,
    firstName: 'Mary',
    lastName: 'Johnson',
    email: 'mary.johnson@email.com',
    phone: '(555) 234-5678',
    relationship: 'Daughter',
    status: 'active',
    patients: 1,
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Williams',
    email: 'robert.williams@email.com',
    phone: '(555) 345-6789',
    relationship: 'Spouse',
    status: 'inactive',
    patients: 1,
  },
]

export default function GuardiansPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGuardians = mockGuardians.filter(
    (guardian) =>
      guardian.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guardian.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guardian.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guardians</h1>
          <p className="text-muted-foreground mt-2">
            Manage patient guardians and their contact information
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Guardian
        </Button>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search guardians by name or email..."
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
                  Phone
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Relationship
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Patients
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
              {filteredGuardians.length > 0 ? (
                filteredGuardians.map((guardian) => (
                  <tr
                    key={guardian.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium">
                      {guardian.firstName} {guardian.lastName}
                    </td>
                    <td className="py-3 px-6 text-muted-foreground">
                      {guardian.email}
                    </td>
                    <td className="py-3 px-6">{guardian.phone}</td>
                    <td className="py-3 px-6">{guardian.relationship}</td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {guardian.patients}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          guardian.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {guardian.status.charAt(0).toUpperCase() +
                          guardian.status.slice(1)}
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
                    No guardians found matching your search
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
