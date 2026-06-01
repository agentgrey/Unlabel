import { useState } from 'react'
import Tesseract from 'tesseract.js'

export function useOCR() {
  const [ocrText, setOcrText] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const scanImage = async (imageFile) => {
    if (!imageFile) return

    setLoading(true)
    setError(null)
    setOcrText(null)
    setProgress(0)

    try {
      const result = await Tesseract.recognize(imageFile, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
          }
        },
      })

      const text = result.data.text.trim()

      if (!text) {
        setError('no text found — try a clearer photo')
        return
      }

      setOcrText(text)
      return text

    } catch (err) {
      setError('something went wrong — try again')
      console.error('[ocr] failed:', err)
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const clearOCR = () => {
    setOcrText(null)
    setError(null)
    setProgress(0)
  }

  return { scanImage, clearOCR, ocrText, progress, loading, error }
}