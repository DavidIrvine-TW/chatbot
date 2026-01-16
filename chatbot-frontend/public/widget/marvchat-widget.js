(function() {
  'use strict';

  // Configuration
  const CHATBOT_URL = 'https://chatbot-five-mu-76.vercel.app';

  // For local development, use:
  // const CHATBOT_URL = 'http://localhost:5173';

  // Create styles
  const styles = document.createElement('style');
  styles.textContent = `
    #marvchat-widget-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #D97706;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    #marvchat-widget-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    #marvchat-widget-btn svg {
      width: 28px;
      height: 28px;
      fill: white;
    }

    #marvchat-widget-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    #marvchat-widget-overlay.open {
      display: flex;
    }

    #marvchat-widget-modal {
      width: 100%;
      max-width: 450px;
      height: 600px;
      max-height: 80vh;
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    #marvchat-widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background-color: #F9FAFB;
      border-bottom: 1px solid #E5E7EB;
    }

    #marvchat-widget-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    #marvchat-widget-title svg {
      width: 20px;
      height: 20px;
      fill: #D97706;
    }

    #marvchat-widget-close {
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6B7280;
      transition: color 0.15s ease;
    }

    #marvchat-widget-close:hover {
      color: #111827;
    }

    #marvchat-widget-close svg {
      width: 20px;
      height: 20px;
    }

    #marvchat-widget-iframe {
      width: 100%;
      height: calc(100% - 49px);
      border: none;
    }

    @media (max-width: 500px) {
      #marvchat-widget-modal {
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }

      #marvchat-widget-overlay {
        padding: 0;
      }
    }
  `;
  document.head.appendChild(styles);

  // Create floating button
  const button = document.createElement('button');
  button.id = 'marvchat-widget-btn';
  button.setAttribute('aria-label', 'Open chat');
  button.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg>
  `;
  document.body.appendChild(button);

  // Create overlay and modal
  const overlay = document.createElement('div');
  overlay.id = 'marvchat-widget-overlay';
  overlay.innerHTML = `
    <div id="marvchat-widget-modal">
      <div id="marvchat-widget-header">
        <div id="marvchat-widget-title">
          <svg viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
          MarvChat
        </div>
        <button id="marvchat-widget-close" aria-label="Close chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <iframe id="marvchat-widget-iframe" src="" title="MarvChat"></iframe>
    </div>
  `;
  document.body.appendChild(overlay);

  // Get elements
  const closeBtn = document.getElementById('marvchat-widget-close');
  const iframe = document.getElementById('marvchat-widget-iframe');

  // Open chat
  function openChat() {
    if (!iframe.getAttribute('src')) {
      iframe.src = CHATBOT_URL + '?mode=widget';
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close chat
  function closeChat() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Event listeners
  button.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeChat();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeChat();
    }
  });
})();
