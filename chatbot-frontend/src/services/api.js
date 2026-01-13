import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function sendMessage(message, conversationHistory = []) {
  try {
    const response = await apiClient.post('/api/chat', {
      message,
      conversationHistory,
    })
    return {
      success: true,
      reply: response.data.reply,
      timestamp: response.data.timestamp,
    }
  } catch (error) {
    console.error('API Error:', error)

    if (error.response) {
      // Server responded with error
      const status = error.response.status
      const message = error.response.data?.error || 'An error occurred'

      if (status === 429) {
        return { success: false, error: 'Rate limit exceeded. Please try again later.' }
      }
      if (status === 503) {
        return { success: false, error: 'Service is starting up. Please try again in a moment.' }
      }
      return { success: false, error: message }
    }

    if (error.code === 'ECONNABORTED') {
      return { success: false, error: 'Request timed out. Please try again.' }
    }

    return { success: false, error: 'Unable to connect to the server.' }
  }
}

export async function checkHealth() {
  try {
    const response = await apiClient.get('/api/health')
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: 'Server is not responding' }
  }
}

export default {
  sendMessage,
  checkHealth,
}
