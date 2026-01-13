import { useEffect, useRef } from 'react'
import MessageBubble from '../MessageBubble/MessageBubble'
import ChatInput from '../ChatInput/ChatInput'
import './ChatWindow.css'

const STARTER_QUESTIONS = [
  "What technologies does David work with?",
  "Tell me about David's recent projects",
  "What's David's work experience?",
  "Is David available for hire?"
]

function ChatWindow({ messages, onSendMessage, onClearChat, isLoading }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleStarterClick = (question) => {
    onSendMessage(question)
  }

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-messages-empty">
            <div className="starter-section">
              <h2 className="starter-title">Ask about David</h2>
              <p className="starter-subtitle">Web Developer based in the UK</p>
              <div className="starter-questions">
                {STARTER_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    className="starter-btn"
                    onClick={() => handleStarterClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.content}
                isUser={msg.role === 'user'}
              />
            ))}
          </>
        )}

        {isLoading && (
          <div className="typing-indicator">
            <svg className="typing-avatar" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
            <div className="typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-wrapper">
        <div className="chat-input-row">
          <ChatInput onSend={onSendMessage} disabled={isLoading} />
          {messages.length > 0 && onClearChat && (
            <button
              className="clear-chat-btn"
              onClick={onClearChat}
              title="Clear chat"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
