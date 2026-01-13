
import { Request, Response } from 'express'
import axios from 'axios'
import { generateChatResponse } from '../services/huggingface'


interface ChatRequest {
  message: string
  conversationHistory?: Array<{ role: string; content: string }>
}

export async function handleChat(req: Request, res: Response): Promise<void> {
  try {

    const { message, conversationHistory = [] }: ChatRequest = req.body

    if (!message || typeof message !== 'string') {
      // 400: client sent invalid data
      res.status(400).json({ error: 'Message is required' })
      return 
    }

    if (message.length > 1000) {
      res.status(400).json({ error: 'Message too long (max 1000 characters)' })
      return
    }
    const reply = await generateChatResponse(message, conversationHistory)

    res.json({
      reply,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
   
    console.error('Chat error:', error)
   
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      // 503: Model is cold-starting
      if (error.response?.status === 503) {
        res.status(503).json({
          error: 'Model is loading, please try again in a few seconds',
        })
        return
      }
      // 429: hit rate limit
      if (error.response?.status === 429) {
        res.status(429).json({
          error: 'Rate limit exceeded, please wait a moment',
        })
        return
      }
    }
    // Check for API key config error
    if (error instanceof Error && error.message.includes('API key')) {
      res.status(500).json({ error: error.message })
      return
    }
    // Generic error response for anything else
    res.status(500).json({ error: 'Failed to process message' })
  }
}
