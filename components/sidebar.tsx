'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  ClipboardList,
  Calendar,
  AlertTriangle,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  onClose?: () => void
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/guardians', label: 'Guardians', icon: Users },
  { href: '/caregivers', label: 'Caregivers', icon: Stethoscope },
  { href: '/care-requests', label: 'Care Requests', icon: ClipboardList },
  { href: '/assignments', label: 'Assignments', icon: Calendar },
  { href: '/leave-requests', label: 'Leave Requests', icon: Calendar },
  { href: '/incidents', label: 'Incidents', icon: AlertTriangle },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo/Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PC</span>
          </div>
          <h1 className="text-lg font-bold">CareMgmt</h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-accent rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-border p-4 text-xs text-muted-foreground">
        <p>© 2024 Patient Caregiver Management</p>
      </div>
    </div>
  )
}
