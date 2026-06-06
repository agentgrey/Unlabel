import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const config = {
  safe: {
    label: 'safe',
    className: 'bg-success/10 text-success border-success/20 hover:bg-success/10',
  },
  caution: {
    label: 'caution',
    className: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/10',
  },
  avoid: {
    label: 'avoid',
    className: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10',
  },
}

export default function SafetyBadge({ level = 'safe' }) {
  const { label, className } = config[level] ?? config.safe
  return (
    <Badge variant="outline" className={cn('text-xs font-medium', className)}>
      {label}
    </Badge>
  )
}