'use client'

import {
  Users,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { StatCard } from '@/components/stat-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Active Patients',
      value: '24',
      icon: Users,
      description: '5 new this month',
      trend: { direction: 'up' as const, percentage: 12 },
    },
    {
      title: 'Available Caregivers',
      value: '18',
      icon: Stethoscope,
      description: '8 on leave',
      trend: { direction: 'down' as const, percentage: 8 },
    },
    {
      title: 'Active Care Requests',
      value: '32',
      icon: ClipboardList,
      description: '7 pending approval',
      trend: { direction: 'up' as const, percentage: 15 },
    },
    {
      title: 'Open Incidents',
      value: '3',
      icon: AlertTriangle,
      description: '1 critical',
      trend: { direction: 'down' as const, percentage: 25 },
    },
  ]

  const recentAssignments = [
    {
      id: 1,
      patient: 'John Doe',
      caregiver: 'Sarah Johnson',
      startDate: '2024-03-01',
      status: 'active',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      caregiver: 'Mike Wilson',
      startDate: '2024-02-28',
      status: 'active',
    },
    {
      id: 3,
      patient: 'Robert Brown',
      caregiver: 'Lisa Anderson',
      startDate: '2024-02-25',
      status: 'pending',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your care management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Assignments Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Assignments</h2>
          <Link href="/assignments">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Patient
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Caregiver
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Start Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="py-3 px-4">{assignment.patient}</td>
                  <td className="py-3 px-4">{assignment.caregiver}</td>
                  <td className="py-3 px-4">
                    {new Date(assignment.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assignment.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {assignment.status.charAt(0).toUpperCase() +
                        assignment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/guardians">
              <Button variant="outline" className="w-full justify-start">
                Add New Guardian
              </Button>
            </Link>
            <Link href="/caregivers">
              <Button variant="outline" className="w-full justify-start">
                Register Caregiver
              </Button>
            </Link>
            <Link href="/care-requests">
              <Button variant="outline" className="w-full justify-start">
                Create Care Request
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Connection</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">All Services</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Backup</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
