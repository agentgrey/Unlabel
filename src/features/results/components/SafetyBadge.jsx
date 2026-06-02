const config = {
  safe:    { label: 'safe',    className: 'badge-success' },
  caution: { label: 'caution', className: 'badge-warning' },
  avoid:   { label: 'avoid',   className: 'badge-error'   },
}

export default function SafetyBadge({ level = 'safe' }) {
  const { label, className } = config[level] ?? config.safe
  return (
    <span className={`badge ${className} badge-sm font-medium`}>
      {label}
    </span>
  )
}