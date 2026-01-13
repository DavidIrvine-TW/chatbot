import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/health'
import chatRoutes from './routes/chat'

const app = express()

const PORT: number = parseInt(process.env.PORT || '5000', 10)

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/health', healthRoutes) // Health check
app.use('/api/chat', chatRoutes) // Chat: POST /api/chat

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})
