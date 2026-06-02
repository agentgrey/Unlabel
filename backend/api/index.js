import analyzeRoutes from './analyze.js'

export default function registerRoutes(app) {
  app.use('/api/analyze', analyzeRoutes)
}