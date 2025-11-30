import React, { useState } from 'react';
import './MessagesApp.css';

interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Anna Andersson',
    avatar: '👩',
    lastMessage: 'Ses vi imorgon?',
    time: '14:32',
    unread: 2
  },
  {
    id: '2',
    name: 'Erik Johansson',
    avatar: '👨',
    lastMessage: 'Tack för hjälpen!',
    time: '13:15'
  },
  {
    id: '3',
    name: 'Maria Svensson',
    avatar: '👩‍🦰',
    lastMessage: 'Haha, det var roligt 😂',
    time: '11:45'
  },
  {
    id: '4',
    name: 'Johan Karlsson',
    avatar: '👨‍💼',
    lastMessage: 'Mötet är klockan 15:00',
    time: 'Igår'
  },
  {
    id: '5',
    name: 'Lisa Berg',
    avatar: '👩‍💻',
    lastMessage: 'Perfekt! 👍',
    time: 'Igår'
  },
  {
    id: '6',
    name: 'Familjen',
    avatar: '👨‍👩‍👧‍👦',
    lastMessage: 'Mamma: Vi ses på söndag',
    time: 'Måndag'
  }
];

const sampleMessages: Record<string, Message[]> = {
  '1': [
    { id: '1', text: 'Hej! Hur mår du?', time: '14:28', isSent: false },
    { id: '2', text: 'Hej! Jag mår bra, tack! Hur är det med dig?', time: '14:29', isSent: true },
    { id: '3', text: 'Jättebra! Har du tid imorgon?', time: '14:30', isSent: false },
    { id: '4', text: 'Ses vi imorgon?', time: '14:32', isSent: false }
  ],
  '2': [
    { id: '1', text: 'Kan du hjälpa mig med projektet?', time: '13:10', isSent: false },
    { id: '2', text: 'Självklart! Vad behöver du hjälp med?', time: '13:12', isSent: true },
    { id: '3', text: 'Tack för hjälpen!', time: '13:15', isSent: false }
  ]
};

interface MessagesAppProps {
  onClose: () => void
}

const MessagesApp: React.FC<MessagesAppProps> = ({ onClose }) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation)
  };

  const handleBack = () => {
    if (selectedConversation) {
      setSelectedConversation(null)
    } else {
      onClose()
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('')
    }
  };

  const messages = selectedConversation ? sampleMessages[selectedConversation.id] || [] : [];

  return (
    <div className="messages-app">
      <div className="messages-app__header">
        <button 
          className="messages-app__back-button" 
          onClick={handleBack}
          aria-label="Tillbaka"
        >
          <svg width="13" height="21" viewBox="0 0 13 21" fill="none">
            <path d="M10.5 3L3 10.5L10.5 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{selectedConversation ? 'Meddelanden' : 'Tillbaka'}</span>
        </button>
        {selectedConversation && (
          <div className="messages-app__header-title">
            <span className="messages-app__header-avatar">{selectedConversation.avatar}</span>
            <span className="messages-app__header-name">{selectedConversation.name}</span>
          </div>
        )}
        <button className="messages-app__compose-button" aria-label="Nytt meddelande">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.5 2.5L14.5 21.5L10 13L1.5 8.5L21.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {!selectedConversation ? (
        <div className="messages-app__conversations">
          <div className="messages-app__search">
            <svg className="messages-app__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Sök" 
              className="messages-app__search-input"
            />
          </div>

          <div className="messages-app__conversation-list">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className="messages-app__conversation-item"
                onClick={() => handleConversationClick(conversation)}
              >
                <div className="messages-app__conversation-avatar">
                  {conversation.avatar}
                </div>
                <div className="messages-app__conversation-content">
                  <div className="messages-app__conversation-header">
                    <span className="messages-app__conversation-name">{conversation.name}</span>
                    <span className="messages-app__conversation-time">{conversation.time}</span>
                  </div>
                  <div className="messages-app__conversation-footer">
                    <span className="messages-app__conversation-preview">{conversation.lastMessage}</span>
                    {conversation.unread && (
                      <span className="messages-app__conversation-badge">{conversation.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="messages-app__chat">
          <div className="messages-app__messages">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`messages-app__message ${message.isSent ? 'messages-app__message--sent' : 'messages-app__message--received'}`}
              >
                <div className="messages-app__message-bubble">
                  <p className="messages-app__message-text">{message.text}</p>
                </div>
                <span className="messages-app__message-time">{message.time}</span>
              </div>
            ))}
          </div>

          <div className="messages-app__input-container">
            <button className="messages-app__camera-button" aria-label="Kamera">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <div className="messages-app__input-wrapper">
              <input 
                type="text" 
                placeholder="iMessage"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="messages-app__input"
              />
            </div>
            <button 
              className="messages-app__send-button"
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              aria-label="Skicka"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
};

export default MessagesApp;