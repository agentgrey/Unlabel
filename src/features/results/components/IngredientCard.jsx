import { useState } from 'react'
import SafetyBadge from './SafetyBadge'

const borderColor = {
  safe:    'border-success/30',
  caution: 'border-warning/30',
  avoid:   'border-error/30',
}

const bgColor = {
  safe:    'bg-success/5',
  caution: 'bg-warning/5',
  avoid:   'bg-error/5',
}

export default function IngredientCard({ ingredient }) {
  const [expanded, setExpanded] = useState(false)
  const { name, safety_level, purpose, summary, side_effects, banned_in, daily_limit, who_should_avoid } = ingredient
  const border = borderColor[safety_level] ?? borderColor.safe
  const bg = bgColor[safety_level] ?? bgColor.safe

  return (
    <div
      className={`rounded-2xl border ${border} ${bg} p-4 cursor-pointer hover:shadow-sm active:scale-[0.99] transition-all duration-150`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <p className="font-semibold truncate">{name}</p>
          <span className="text-xs text-base-content/40 hidden sm:inline">
            {purpose}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <SafetyBadge level={safety_level} />
          <span className="text-base-content/30 text-xs">
            {expanded ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {/* summary always visible */}
      <p className="text-sm text-base-content/60 mt-2">{summary}</p>

      {/* expanded details */}
      {expanded && (
        <div className="mt-4 flex flex-col gap-3 text-sm border-t border-base-200 pt-3">

          {side_effects?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-base-content/40 mb-1">
                side effects
              </p>
              <ul className="flex flex-col gap-0.5">
                {side_effects.map((effect, i) => (
                  <li key={i} className="text-sm text-base-content/70">
                    · {effect}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {who_should_avoid?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-base-content/40 mb-1">
                who should avoid
              </p>
              <ul className="flex flex-col gap-0.5">
                {who_should_avoid.map((group, i) => (
                  <li key={i} className="text-sm text-base-content/70">
                    · {group}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {daily_limit && (
            <div>
              <p className="text-xs font-medium text-base-content/40 mb-1">
                daily limit
              </p>
              <p className="text-sm text-base-content/70">{daily_limit}</p>
            </div>
          )}

          {banned_in?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-base-content/40 mb-1">
                banned in
              </p>
              <p className="text-sm text-base-content/70">
                {banned_in.join(', ')}
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}