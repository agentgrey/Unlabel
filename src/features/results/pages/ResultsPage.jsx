import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import IngredientCard from '../components/IngredientCard'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'

const safetyOrder = { avoid: 0, caution: 1, safe: 2 }

const summaryConfig = {
  safe: { label: 'safe', className: 'text-success' },
  caution: { label: 'caution', className: 'text-warning' },
  avoid: { label: 'avoid', className: 'text-destructive' },
}

export default function ResultsPage() {
  const { currentScan, clearScan } = useAppStore()
  const navigate = useNavigate()

  if (!currentScan) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            no scan results yet — go scan something 👀
          </p>
          <Button onClick={() => navigate('/')} variant="outline" size="sm">
            scan a product
          </Button>
        </div>
      </div>
    )
  }

  const { ingredients } = currentScan

  const sorted = [...ingredients].sort(
    (a, b) => safetyOrder[a.safety_level] - safetyOrder[b.safety_level]
  )

  const counts = ingredients.reduce((acc, item) => {
    acc[item.safety_level] = (acc[item.safety_level] ?? 0) + 1
    return acc
  }, {})

  const handleScanAnother = () => {
    clearScan()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-6">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">here's the breakdown</h1>
            <p className="text-muted-foreground text-sm mt-1">
              tap any ingredient to see the full details
            </p>
          </div>
          <button
            onClick={handleScanAnother}
            className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2 cursor-pointer transition-colors duration-150 mt-1"
          >
            scan another
          </button>
        </div>

        <div className="flex gap-3">
          {Object.entries(summaryConfig).map(([level, { label, className }]) =>
            counts[level] ? (
              <div
                key={level}
                className="flex-1 bg-muted rounded-2xl p-3 text-center"
              >
                <p className={`text-2xl font-bold ${className}`}>
                  {counts[level]}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ) : null
          )}
        </div>

        <div className="flex flex-col gap-3">
          {sorted.map((ingredient, i) => (
            <IngredientCard key={i} ingredient={ingredient} />
          ))}
        </div>

      </main>
    </div>
  )
}