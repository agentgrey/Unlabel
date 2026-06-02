import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import registerRoutes from './backend/api/index.js'

config({ path: '.env.local' })

const app = express()
app.use(cors())
app.use(express.json())

registerRoutes(app)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server up on http://localhost:${PORT}`)
})