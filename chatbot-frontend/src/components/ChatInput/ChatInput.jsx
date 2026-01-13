import { useState } from 'react'
import './ChatInput.css'

function ChatInput({ onSend, disabled, placeholder = "Ask about David's skills & experience" }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          type="submit"
          className="send-btn"
          disabled={disabled || !message.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
