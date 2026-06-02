import { useState } from 'react'
import UploadZone from '../components/UploadZone'
import { useOCR } from '../hooks/useOCR'
import { useAnalysis } from '../hooks/useAnalysis'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../../store/useAppStore'

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { scanImage, clearOCR, ocrText, progress, loading: ocrLoading, error: ocrError } = useOCR()
  const { analyze, clearAnalysis, ingredients, loading: analysisLoading, error: analysisError } = useAnalysis()
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
    <div className="h-full flex flex-col max-w-2xl mx-auto px-4 py-8 gap-6">

      <div>
        <h1 className="text-2xl font-bold">scan a product</h1>
        <p className="text-base-content/50 text-sm mt-1">
          upload a photo of the ingredients list — we'll do the rest
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <UploadZone
          onImageSelected={handleImageSelected}
          externalClear={!selectedImage}
        />

        {/* scan button */}
        {selectedImage && !ocrLoading && !ocrText && (
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => scanImage(selectedImage)}
              className="btn btn-primary w-full active:scale-[0.98] transition-all duration-150"
            >
              scan ingredients 🔍
            </button>
            <p className="text-xs text-base-content/30">
              we'll read the text and break down every ingredient
            </p>
          </div>
        )}

        {/* ocr progress */}
        {ocrLoading && (
          <div className="flex flex-col items-center gap-3 py-4">
            <span className="loading loading-spinner loading-md text-primary" />
            <p className="text-sm text-base-content/50">
              reading the label... {progress}%
            </p>
            <progress
              className="progress progress-primary w-full max-w-xs"
              value={progress}
              max="100"
            />
          </div>
        )}

        {/* ocr error */}
        {ocrError && (
          <div className="alert alert-error text-sm rounded-xl">
            <span>{ocrError}</span>
          </div>
        )}

        {/* ocr result + analyze */}
        {ocrText && !ocrLoading && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-success">
                text extracted ✓
              </p>
              <button
                onClick={handleScanAnother}
                className="text-xs text-base-content/30 hover:text-primary underline underline-offset-2 cursor-pointer transition-colors duration-150"
              >
                scan another
              </button>
            </div>

            <div className="bg-base-200 rounded-xl p-4 text-xs text-base-content/60 font-mono leading-relaxed max-h-36 overflow-y-auto">
              {ocrText}
            </div>

            {/* analysis error */}
            {analysisError && (
              <div className="alert alert-error text-sm rounded-xl">
                <span>{analysisError}</span>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={analysisLoading}
              className="btn btn-primary w-full active:scale-[0.98] transition-all duration-150"
            >
              {analysisLoading
                ? <span className="loading loading-spinner loading-sm" />
                : 'analyse ingredients 🧪'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}