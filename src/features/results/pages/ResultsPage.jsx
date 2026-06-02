import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../../store/useAppStore'
import IngredientCard from '../components/IngredientCard'

const safetyOrder = { avoid: 0, caution: 1, safe: 2 }

const summaryConfig = {
  safe:    { label: 'safe',    className: 'text-success' },
  caution: { label: 'caution', className: 'text-warning' },
  avoid:   { label: 'avoid',   className: 'text-error'   },
}

export default function ResultsPage() {
  const { currentScan, clearScan } = useAppStore()
  const navigate = useNavigate()

  if (!currentScan) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-base-content/40 text-sm">
          no scan results yet — go scan something 👀
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary btn-sm mt-4"
        >
          scan a product
        </button>
      </div>
    )
  }

  const { ingredients } = currentScan

  // sort by safety — avoid first, safe last
  const sorted = [...ingredients].sort(
    (a, b) => safetyOrder[a.safety_level] - safetyOrder[b.safety_level]
  )

  // count by safety level
  const counts = ingredients.reduce((acc, item) => {
    acc[item.safety_level] = (acc[item.safety_level] ?? 0) + 1
    return acc
  }, {})

  const handleScanAnother = () => {
    clearScan()
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">here's the breakdown</h1>
          <p className="text-base-content/50 text-sm mt-1">
            tap any ingredient to see the full details
          </p>
        </div>
        <button
          onClick={handleScanAnother}
          className="btn btn-ghost btn-sm text-base-content/40 hover:text-primary transition-colors duration-150"
        >
          scan another
        </button>
      </div>

      {/* summary strip */}
      <div className="flex gap-3">
        {Object.entries(summaryConfig).map(([level, { label, className }]) => (
          counts[level] ? (
            <div
              key={level}
              className="flex-1 bg-base-200 rounded-xl p-3 text-center"
            >
              <p className={`text-xl font-bold ${className}`}>
                {counts[level]}
              </p>
              <p className="text-xs text-base-content/40 mt-0.5">{label}</p>
            </div>
          ) : null
        ))}
      </div>

      {/* ingredient cards */}
      <div className="flex flex-col gap-3">
        {sorted.map((ingredient, i) => (
          <IngredientCard key={i} ingredient={ingredient} />
        ))}
      </div>

    </div>
  )
}