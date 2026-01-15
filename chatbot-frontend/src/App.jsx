import { useState, useEffect, useMemo } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import ChatWindow from './components/ChatWindow/ChatWindow'
import { sendMessage } from './services/api'
import './App.css'

const STORAGE_KEY = 'marvchat_conversations'
const ACTIVE_KEY = 'marvchat_active_id'

function App() {
  // Check if running in widget mode
  const isWidgetMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('mode') === 'widget'
  }, [])

  const [conversations, setConversations] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [activeConversationId, setActiveConversationId] = useState(() => {
    // Load active conversation ID from localStorage
    return localStorage.getItem(ACTIVE_KEY) || null
  })
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  // Get active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId)

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  }, [conversations])

  // Save active conversation ID to localStorage
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem(ACTIVE_KEY, activeConversationId)
    } else {
      localStorage.removeItem(ACTIVE_KEY)
    }
  }, [activeConversationId])

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      setMessages(activeConversation.messages || [])
    } else {
      setMessages([])
    }
  }, [activeConversationId])

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New conversation',
      messages: [],
    }
    setConversations(prev => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
    setMessages([])
  }

  const handleSelectChat = (id) => {
    setActiveConversationId(id)
  }

  const handleEditChat = (id) => {
    const newTitle = prompt('Enter new title:')
    if (newTitle && newTitle.trim()) {
      setConversations(prev =>
        prev.map(c => c.id === id ? { ...c, title: newTitle.trim() } : c)
      )
    }
  }

  const handleDeleteChat = (id) => {
    if (confirm('Delete this conversation?')) {
      setConversations(prev => prev.filter(c => c.id !== id))
      if (activeConversationId === id) {
        setActiveConversationId(null)
        setMessages([])
      }
    }
  }

  const handleClearChat = () => {
    if (activeConversationId && messages.length > 0) {
      // Clear messages from current conversation
      setMessages([])
      setConversations(prev =>
        prev.map(c =>
          c.id === activeConversationId
            ? { ...c, messages: [], title: 'New conversation' }
            : c
        )
      )
    }
  }

  const handleSendMessage = async (content) => {
    // Create new conversation if none active
    let currentConvId = activeConversationId
    if (!currentConvId) {
      const newConversation = {
        id: Date.now().toString(),
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
      }
      setConversations(prev => [newConversation, ...prev])
      currentConvId = newConversation.id
      setActiveConversationId(currentConvId)
    }

    // Add user message
    const userMessage = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    // Update conversation title if first message
    if (messages.length === 0) {
      setConversations(prev =>
        prev.map(c =>
          c.id === currentConvId
            ? { ...c, title: content.slice(0, 30) + (content.length > 30 ? '...' : '') }
            : c
        )
      )
    }

    // Send to API
    setIsLoading(true)
    setError(null)

    const conversationHistory = updatedMessages.map(m => ({
      role: m.role,
      content: m.content,
    }))

    const result = await sendMessage(content, conversationHistory)

    setIsLoading(false)

    if (result.success) {
      const botMessage = { role: 'assistant', content: result.reply }
      const finalMessages = [...updatedMessages, botMessage]
      setMessages(finalMessages)

      // Update conversation with all messages
      setConversations(prev =>
        prev.map(c =>
          c.id === currentConvId ? { ...c, messages: finalMessages } : c
        )
      )
    } else {
      setError(result.error)
    }
  }

  // Widget mode - simplified layout without sidebar
  if (isWidgetMode) {
    return (
      <div className="app widget-mode">
        <main className="main-content widget-content">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            isLoading={isLoading}
          />
        </main>

        {error && (
          <div className="error-toast">
            {error}
          </div>
        )}
      </div>
    )
  }

  // Full mode - with sidebar
  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onEditChat={handleEditChat}
        onDeleteChat={handleDeleteChat}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      <main className="main-content">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
          isLoading={isLoading}
        />
      </main>

      {error && (
        <div className="error-toast">
          {error}
        </div>
      )}
    </div>
  )
}

export default App
