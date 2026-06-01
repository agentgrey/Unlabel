const levels = {
  safe:    { label: 'safe',    style: 'badge-success' },
  caution: { label: 'caution', style: 'badge-warning' },
  avoid:   { label: 'avoid',   style: 'badge-error'   },
}

export default function SafetyBadge({ level = 'safe' }) {
  const { label, style } = levels[level] ?? levels.safe
  return (
    <span className={`badge ${style} badge-sm font-medium`}>
      {label}
    </span>
  )
}