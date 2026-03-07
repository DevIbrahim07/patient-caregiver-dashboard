'use client'

import { Menu, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-4 md:px-8 py-4 flex items-center justify-between">
      {/* Left side - Menu button on mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-accent rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center - Title (hidden on mobile) */}
      <div className="hidden md:block flex-1">
        <h2 className="text-xl font-semibold">Management System</h2>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4 ml-auto md:ml-0">
        <button className="p-2 hover:bg-accent rounded-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 bg-muted"
            >
              <User className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
