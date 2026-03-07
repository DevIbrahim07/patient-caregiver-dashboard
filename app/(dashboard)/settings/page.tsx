'use client'

import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function SettingsPage() {
  const [organizationName, setOrganizationName] = useState(
    'Healthcare Management Solutions'
  )
  const [email, setEmail] = useState('admin@healthcare.com')
  const [phone, setPhone] = useState('(555) 555-5555')
  const [address, setAddress] = useState('123 Medical Center Dr, City, State 12345')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your organization settings and preferences
        </p>
      </div>

      {/* Organization Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Organization Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Organization Name</label>
            <Input
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive system notifications
              </p>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Alerts</p>
              <p className="text-sm text-muted-foreground">
                Receive critical alerts via email
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded"
            />
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">User Management</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-muted-foreground">admin@healthcare.com</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Add New User</p>
              <p className="text-sm text-muted-foreground">
                Invite a new administrator or staff member
              </p>
            </div>
            <Button variant="outline" size="sm">
              Invite
            </Button>
          </div>
        </div>
      </div>

      {/* Backup & Security */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Backup & Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Data Backup</p>
              <p className="text-sm text-muted-foreground">
                Last backup: 2 hours ago
              </p>
            </div>
            <Button variant="outline" size="sm">
              Backup Now
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Enabled for admin accounts
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These actions cannot be undone. Please proceed with caution.
        </p>
        <Button variant="destructive" size="sm">
          Delete Organization
        </Button>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
