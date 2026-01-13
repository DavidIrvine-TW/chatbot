import './Sidebar.css'

function Sidebar({
  conversations,
  activeId,
  onNewChat,
  onSelectChat,
  onEditChat,
  onDeleteChat,
  isOpen,
  onToggle
}) {
  const handleNewChat = () => {
    onNewChat()
    // Close sidebar on mobile after action
    if (window.innerWidth <= 768) {
      onToggle()
    }
  }

  const handleSelectChat = (id) => {
    onSelectChat(id)
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={onToggle} aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <svg className="sidebar-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="currentColor"/>
            </svg>
            <span className="sidebar-title">MarvChat</span>
          </div>

          {/* Close button - mobile only */}
          <button className="sidebar-close" onClick={onToggle} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <svg className="new-chat-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="currentColor"/>
          </svg>
          <span className="new-chat-text">New Chat</span>
        </button>

        <div className="conversations-section">
          <h2 className="conversations-header">Conversations</h2>
          <div className="conversations-list">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`conversation-item ${activeId === conv.id ? 'active' : ''}`}
                onClick={() => handleSelectChat(conv.id)}
              >
                <div className="conversation-content">
                  <svg className="conversation-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
                  </svg>
                  <span className="conversation-title">{conv.title}</span>
                </div>
                <div className="conversation-actions">
                  <button
                    className="action-btn"
                    onClick={(e) => { e.stopPropagation(); onEditChat(conv.id); }}
                    aria-label="Edit conversation"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="action-btn"
                    onClick={(e) => { e.stopPropagation(); onDeleteChat(conv.id); }}
                    aria-label="Delete conversation"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
