const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const analyzeIngredients = async (extractedText) => {
  const response = await fetch(`${BACKEND_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: extractedText }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error ?? 'analysis failed')
  }

  const data = await response.json()
  return data.ingredients
}