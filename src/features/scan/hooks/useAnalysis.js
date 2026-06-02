import { useState } from 'react'
import { analyzeIngredients } from '../services/analyzeService'

export function useAnalysis() {
  const [ingredients, setIngredients] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async (extractedText) => {
    setLoading(true)
    setError(null)
    setIngredients(null)

    try {
      const result = await analyzeIngredients(extractedText)
      setIngredients(result)
      return result
    } catch (err) {
      setError(err.message)
      console.error('[analysis] failed:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const clearAnalysis = () => {
    setIngredients(null)
    setError(null)
  }

  return { analyze, clearAnalysis, ingredients, loading, error }
}