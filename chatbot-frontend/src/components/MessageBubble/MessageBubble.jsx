import './MessageBubble.css'

function MessageBubble({ message, isUser }) {
  const type = isUser ? 'user' : 'bot'

  return (
    <div className={`message-wrapper ${type}`}>
      {!isUser && (
        <svg className="bot-avatar" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
      )}
      <div className={`message-bubble ${type}`}>
        <p className="message-text">{message}</p>
      </div>
    </div>
  )
}

export default MessageBubble
