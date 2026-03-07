'use client'

import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mockIncidents = [
  {
    id: 1,
    patient: 'John Doe',
    caregiver: 'Sarah Johnson',
    type: 'Fall',
    severity: 'high',
    date: '2024-03-05',
    status: 'investigating',
    description: 'Patient fell in bathroom',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    caregiver: 'Michael Brown',
    type: 'Medication Error',
    severity: 'critical',
    date: '2024-03-04',
    status: 'investigating',
    description: 'Wrong dosage administered',
  },
  {
    id: 3,
    patient: 'Robert Brown',
    caregiver: 'Sarah Johnson',
    type: 'Behavioral',
    severity: 'medium',
    date: '2024-02-28',
    status: 'resolved',
    description: 'Patient agitation during care',
  },
]

const severityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-800',
  investigating: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
}

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIncidents = mockIncidents.filter(
    (incident) =>
      incident.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.caregiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage patient care incidents
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Report Incident
        </Button>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search by patient, caregiver, or incident type..."
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
                  Incident Type
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Severity
                </th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                  Date
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
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium">{incident.patient}</td>
                    <td className="py-3 px-6">{incident.caregiver}</td>
                    <td className="py-3 px-6">{incident.type}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          severityColors[incident.severity]
                        }`}
                      >
                        {incident.severity.charAt(0).toUpperCase() +
                          incident.severity.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {new Date(incident.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[incident.status]
                        }`}
                      >
                        {incident.status.charAt(0).toUpperCase() +
                          incident.status.slice(1)}
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
                    No incidents found matching your search
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
