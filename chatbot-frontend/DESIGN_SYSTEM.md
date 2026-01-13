# Chatbot Design System

Reference documentation for the chatbot UI based on Figma designs.

---

## Color Palette

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#242627` | Main background, chat container, active conversation |
| `bg-secondary` | `#141718` | Sidebar, bot message bubbles |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#F6FCFD` | Headings, primary text |
| `text-secondary` | `#B3B7B9` | Secondary text, icons, labels |
| `text-muted` | `#6D7275` | Placeholder text, borders |

### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-purple` | `#36309D` | User message bubbles, primary actions |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#242627` | Subtle borders (new chat button) |
| `border-input` | `#6D7275` | Input field borders |
| `border-container` | `#353839` | Chat container border |

---

## Typography

### Font Family
- **Primary:** DM Sans
- **Weights:** Bold (700), Medium (500)

### Font Sizes
| Size | Usage |
|------|-------|
| `16px` | Brand name, input placeholder |
| `14px` | All other text (buttons, messages, labels) |

### Letter Spacing
| Size | Spacing |
|------|---------|
| `16px` | `-0.56px` |
| `14px` | `-0.49px` |

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | `8px` | Vertical padding (buttons), icon gaps |
| `space-sm` | `12px` | Horizontal padding (sidebar items), message gaps |
| `space-md` | `16px` | Input padding, section spacing |
| `space-lg` | `20px` | Container padding, message vertical gap |
| `space-xl` | `24px` | Large spacing, header padding |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-default` | `8px` | All rounded elements |

---

## Icon Sizes

| Size | Usage |
|------|-------|
| `24px` | All icons (add, chat, edit, trash, send, logo) |

---

## Layout Structure

### Desktop Viewport
- **Total width:** 1280px
- **Total height:** 720px

### Sidebar
| Property | Value |
|----------|-------|
| Width | `296px` |
| Background | `#141718` |
| Padding | `20px` |

### Chat Container
| Property | Value |
|----------|-------|
| Width | `720px` |
| Background | `#242627` |
| Border | `1px solid #353839` |
| Border radius | `8px` |
| Shadow | `0px 2px 100px rgba(0,0,0,0.25)` |

### Header Image
| Property | Value |
|----------|-------|
| Height | `200px` |
| Position | Top of viewport, behind chat |

---

## Components

### 1. New Chat Button

```
+------------------------------------------+
|  [+]  New Chat                           |
+------------------------------------------+
```

| Property | Value |
|----------|-------|
| Width | `256px` |
| Height | `40px` |
| Padding | `12px` horizontal, `8px` vertical |
| Border | `2px solid #242627` |
| Border radius | `8px` |
| Background | transparent |
| Icon | `24px` add icon |
| Gap | `8px` between icon and text |
| Text | "New Chat", 14px, Bold, `#B3B7B9` |

---

### 2. Conversation Item

#### Default State
```
+------------------------------------------+
|  [chat]  What is your hobby?             |
+------------------------------------------+
```

| Property | Value |
|----------|-------|
| Width | `256px` |
| Height | `40px` |
| Padding | `12px` horizontal, `8px` vertical |
| Background | transparent |
| Border radius | `8px` |
| Icon | `24px` chat icon |
| Gap | `8px` between icon and text |
| Text | 14px, Bold, `#B3B7B9` |

#### Active/Hover State
```
+------------------------------------------+
|  [chat]  What is your job?    [edit][del]|
+------------------------------------------+
```

| Property | Value |
|----------|-------|
| Background | `#242627` |
| Action icons | Edit + Trash, `24px` each |
| Icons gap | `8px` between action icons |
| Content-actions gap | `40px` |

---

### 3. Chat Input Field

```
+----------------------------------------------------------+
|  Ask simplechat.ai anything                         [>]  |
+----------------------------------------------------------+
```

| Property | Value |
|----------|-------|
| Width | `720px` |
| Height | `48px` |
| Padding | `16px` horizontal, `12px` vertical |
| Border | `2px solid #6D7275` |
| Border radius | `8px` |
| Background | transparent |
| Placeholder | "Ask simplechat.ai anything", 16px, Medium, `#6D7275` |
| Send icon | `24px`, positioned right |

---

### 4. User Message Bubble

```
                              +-------------------------+
                              |  User message text      |
                              +-------------------------+
```

| Property | Value |
|----------|-------|
| Alignment | Right |
| Background | `#6466E9` |
| Padding | `16px` horizontal, `12px` vertical |
| Border radius | `8px` |
| Text | 14px, Medium, `#F6FCFD` |
| Max width | Content-based |

---

### 5. Bot Message Bubble

```
[logo]  +--------------------------------------+
        |  Bot response text here              |
        +--------------------------------------+
```

| Property | Value |
|----------|-------|
| Alignment | Left |
| Background | `#141718` |
| Padding | `16px` horizontal, `12px` vertical |
| Border radius | `8px` |
| Text | 14px, Medium, `#F6FCFD` |
| Max width | `320px` |
| Logo | `24px`, positioned left of bubble |
| Logo-bubble gap | `12px` |

---

### 6. Sidebar Header

```
[logo]  simplechat.ai                    [toggle]
```

| Property | Value |
|----------|-------|
| Logo | `24px` |
| Brand text | "simplechat.ai", 16px, Bold, `#F6FCFD` |
| Logo-text gap | `8px` |
| Toggle icon | `24px`, right-aligned |

---

### 7. Section Header

```
Conversations
```

| Property | Value |
|----------|-------|
| Text | 14px, Bold, `#F6FCFD` |
| Margin bottom | `12px` |

---

## Message Spacing

| Property | Value |
|----------|-------|
| Between messages | `20px` |
| Message area padding | `24px` |

---

## CSS Custom Properties Reference

```css
:root {
  /* Colors */
  --color-bg-primary: #242627;
  --color-bg-secondary: #141718;
  --color-text-primary: #F6FCFD;
  --color-text-secondary: #B3B7B9;
  --color-text-muted: #6D7275;
  --color-accent: #36309D;
  --color-border-default: #242627;
  --color-border-input: #6D7275;
  --color-border-container: #353839;

  /* Typography */
  --font-family: 'DM Sans', sans-serif;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --letter-spacing-sm: -0.49px;
  --letter-spacing-lg: -0.56px;

  /* Spacing */
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 20px;
  --space-xl: 24px;

  /* Border Radius */
  --radius: 8px;

  /* Shadows */
  --shadow-container: 0px 2px 100px rgba(0, 0, 0, 0.25);

  /* Sizes */
  --icon-size: 24px;
  --sidebar-width: 296px;
  --chat-width: 720px;
}
```

---

## Tailwind Config Reference

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': '#242627',
        'bg-secondary': '#141718',
        'text-primary': '#F6FCFD',
        'text-secondary': '#B3B7B9',
        'text-muted': '#6D7275',
        'accent': '#36309D',
        'border-default': '#242627',
        'border-input': '#6D7275',
        'border-container': '#353839',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'base': ['14px', { letterSpacing: '-0.49px' }],
        'lg': ['16px', { letterSpacing: '-0.56px' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
      },
      borderRadius: {
        'DEFAULT': '8px',
      },
      boxShadow: {
        'container': '0px 2px 100px rgba(0, 0, 0, 0.25)',
      },
      width: {
        'sidebar': '296px',
        'chat': '720px',
      },
    },
  },
}
```

---

## File Structure Reference

```
src/
├── components/
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── ChatWindow/
│   │   ├── ChatWindow.jsx
│   │   └── ChatWindow.css
│   ├── MessageBubble/
│   │   ├── MessageBubble.jsx
│   │   └── MessageBubble.css
│   ├── ChatInput/
│   │   ├── ChatInput.jsx
│   │   └── ChatInput.css
│   ├── ConversationItem/
│   │   ├── ConversationItem.jsx
│   │   └── ConversationItem.css
│   └── NewChatButton/
│       ├── NewChatButton.jsx
│       └── NewChatButton.css
├── assets/
│   └── icons/
├── services/
│   └── api.js
├── App.jsx
├── App.css
└── index.css
```
