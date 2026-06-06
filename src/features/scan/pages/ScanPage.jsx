import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadZone from '../components/UploadZone'
import { useOCR } from '../hooks/useOCR'
import { useAnalysis } from '../hooks/useAnalysis'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Navbar from '@/components/Navbar'

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { scanImage, clearOCR, ocrText, progress, loading: ocrLoading, error: ocrError } = useOCR()
  const { analyze, clearAnalysis, loading: analysisLoading, error: analysisError } = useAnalysis()
  const setCurrentScan = useAppStore((s) => s.setCurrentScan)
  const navigate = useNavigate()

  const handleImageSelected = (file) => {
    clearOCR()
    clearAnalysis()
    setSelectedImage(file)
  }

  const handleScanAnother = () => {
    clearOCR()
    clearAnalysis()
    setSelectedImage(null)
  }

  const handleAnalyze = async () => {
    if (!ocrText) return
    const result = await analyze(ocrText)
    if (result) {
      setCurrentScan({ ingredients: result, scannedAt: new Date().toISOString() })
      navigate('/results')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold">scan a product</h1>
          <p className="text-muted-foreground text-sm mt-1">
            upload a photo of the ingredients list — we'll do the rest
          </p>
        </div>

        <UploadZone
          onImageSelected={handleImageSelected}
          externalClear={!selectedImage}
        />

        {selectedImage && !ocrLoading && !ocrText && (
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={() => scanImage(selectedImage)}
              className="w-full"
            >
              scan ingredients
            </Button>
            <p className="text-xs text-muted-foreground">
              we'll read the text and break down every ingredient
            </p>
          </div>
        )}

        {ocrLoading && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">
              reading the label... {progress}%
            </p>
            <Progress value={progress} className="w-full max-w-xs h-1.5" />
          </div>
        )}

        {ocrError && (
          <Alert variant="destructive">
            <AlertDescription className="text-sm">{ocrError}</AlertDescription>
          </Alert>
        )}

        {ocrText && !ocrLoading && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-success">
                text extracted ✓
              </p>
              <button
                onClick={handleScanAnother}
                className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2 cursor-pointer transition-colors duration-150"
              >
                scan another
              </button>
            </div>

            <div className="bg-muted rounded-xl p-4 text-xs text-muted-foreground font-mono leading-relaxed max-h-36 overflow-y-auto">
              {ocrText}
            </div>

            {analysisError && (
              <Alert variant="destructive">
                <AlertDescription className="text-sm">
                  {analysisError}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={analysisLoading}
              className="w-full"
            >
              {analysisLoading
                ? <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    analysing...
                  </span>
                : 'analyse ingredients 🧪'}
            </Button>
          </div>
        )}

      </main>
    </div>
  )
}