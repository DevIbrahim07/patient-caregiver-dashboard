import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  className?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <div className={cn('bg-card border border-border rounded-lg p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-xs">
          <span
            className={
              trend.direction === 'up'
                ? 'text-green-600 font-medium'
                : 'text-red-600 font-medium'
            }
          >
            {trend.direction === 'up' ? '+' : '-'}
            {trend.percentage}%
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      )}
    </div>
  )
}
