import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import SafetyBadge from './SafetyBadge'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const borderConfig = {
  safe: 'border-success/20 hover:border-success/40',
  caution: 'border-warning/20 hover:border-warning/40',
  avoid: 'border-destructive/20 hover:border-destructive/40',
}

const bgConfig = {
  safe: 'bg-success/5',
  caution: 'bg-warning/5',
  avoid: 'bg-destructive/5',
}

export default function IngredientCard({ ingredient }) {
  const [expanded, setExpanded] = useState(false)
  const {
    name,
    safety_level,
    purpose,
    summary,
    side_effects,
    banned_in,
    daily_limit,
    who_should_avoid,
  } = ingredient

  const border = borderConfig[safety_level] ?? borderConfig.safe
  const bg = bgConfig[safety_level] ?? bgConfig.safe

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={cn(
        'rounded-2xl border p-4 cursor-pointer transition-all duration-200',
        'active:scale-[0.99]',
        border,
        bg
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-semibold text-sm truncate">{name}</p>
          <p className="text-xs text-muted-foreground">{purpose}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <SafetyBadge level={safety_level} />
          {expanded
            ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
            : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {summary}
      </p>

      {expanded && (
        <div className="mt-4 flex flex-col gap-3">
          <Separator className="opacity-30" />

          {side_effects?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                side effects
              </p>
              <ul className="flex flex-col gap-1">
                {side_effects.map((effect, i) => (
                  <li key={i} className="text-xs text-foreground/70 flex gap-1.5">
                    <span className="text-muted-foreground mt-0.5">·</span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {who_should_avoid?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                who should avoid
              </p>
              <ul className="flex flex-col gap-1">
                {who_should_avoid.map((group, i) => (
                  <li key={i} className="text-xs text-foreground/70 flex gap-1.5">
                    <span className="text-muted-foreground mt-0.5">·</span>
                    {group}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {daily_limit && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                daily limit
              </p>
              <p className="text-xs text-foreground/70">{daily_limit}</p>
            </div>
          )}

          {banned_in?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                banned in
              </p>
              <p className="text-xs text-foreground/70">{banned_in.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}