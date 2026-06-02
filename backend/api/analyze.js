import { ingredientAnalysisPrompt } from '../lib/prompts.js'
import { callAI } from '../lib/ai.js'

export default async function analyzeHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  const { text } = req.body

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: 'no ingredient text provided' })
  }

  try {
    const ingredients = await callAI(ingredientAnalysisPrompt(text))
    return res.status(200).json({ ingredients })
  } catch (err) {
    console.error('[analyze] failed:', err.message)
    return res.status(500).json({ error: err.message })
  }
}