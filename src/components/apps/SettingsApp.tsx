import React, { useState } from 'react';
import './SettingsApp.css';

interface SettingsSection {
  id: string;
  title?: string;
  items: SettingsItem[]
}

interface SettingsItem {
  id: string;
  icon: string;
  label: string;
  value?: string;
  type: 'link' | 'toggle' | 'info';
  color?: string;
  enabled?: boolean
}

interface SettingsAppProps {
  onClose: () => void
}

const SettingsApp: React.FC<SettingsAppProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<SettingsSection[]>([
    {
      id: 'profile',
      items: [
        {
          id: 'profile',
          icon: '👤',
          label: 'Apple ID, iCloud, Media & Köp',
          value: 'Anna Andersson',
          type: 'link',
          color: '#FFFFFF'
        }
      ]
    },
    {
      id: 'main',
      items: [
        {
          id: 'airplane',
          icon: '✈️',
          label: 'Flygplansläge',
          type: 'toggle',
          color: '#FF9500',
          enabled: false
        },
        {
          id: 'wifi',
          icon: '📶',
          label: 'Wi-Fi',
          value: 'Hemma',
          type: 'link',
          color: '#007AFF'
        },
        {
          id: 'bluetooth',
          icon: '🔵',
          label: 'Bluetooth',
          value: 'På',
          type: 'link',
          color: '#007AFF'
        },
        {
          id: 'cellular',
          icon: '📱',
          label: 'Mobilt',
          type: 'link',
          color: '#34C759'
        },
        {
          id: 'hotspot',
          icon: '🔗',
          label: 'Personlig hotspot',
          value: 'Av',
          type: 'link',
          color: '#34C759'
        }
      ]
    },
    {
      id: 'notifications',
      items: [
        {
          id: 'notifications',
          icon: '🔔',
          label: 'Aviseringar',
          type: 'link',
          color: '#FF3B30'
        },
        {
          id: 'sounds',
          icon: '🔊',
          label: 'Ljud & haptik',
          type: 'link',
          color: '#FF2D55'
        },
        {
          id: 'focus',
          icon: '🌙',
          label: 'Fokus',
          type: 'link',
          color: '#5E5CE6'
        },
        {
          id: 'screentime',
          icon: '⏱️',
          label: 'Skärmtid',
          type: 'link',
          color: '#5E5CE6'
        }
      ]
    },
    {
      id: 'general',
      items: [
        {
          id: 'general',
          icon: '⚙️',
          label: 'Allmänt',
          type: 'link',
          color: '#8E8E93'
        },
        {
          id: 'controlcenter',
          icon: '🎛️',
          label: 'Kontrollcenter',
          type: 'link',
          color: '#8E8E93'
        },
        {
          id: 'display',
          icon: '☀️',
          label: 'Skärm & ljusstyrka',
          type: 'link',
          color: '#007AFF'
        },
        {
          id: 'homescreen',
          icon: '📱',
          label: 'Hemskärm',
          type: 'link',
          color: '#5AC8FA'
        }
      ]
    },
    {
      id: 'apps',
      items: [
        {
          id: 'wallpaper',
          icon: '🖼️',
          label: 'Bakgrund',
          type: 'link',
          color: '#FF2D55'
        },
        {
          id: 'siri',
          icon: '🎤',
          label: 'Siri & Sök',
          type: 'link',
          color: '#000000'
        },
        {
          id: 'faceid',
          icon: '🔐',
          label: 'Face ID & kod',
          type: 'link',
          color: '#34C759'
        },
        {
          id: 'emergency',
          icon: '🆘',
          label: 'Nöd-SOS',
          type: 'link',
          color: '#FF3B30'
        }
      ]
    },
    {
      id: 'privacy',
      items: [
        {
          id: 'battery',
          icon: '🔋',
          label: 'Batteri',
          type: 'link',
          color: '#34C759'
        },
        {
          id: 'privacy',
          icon: '🔒',
          label: 'Integritet & säkerhet',
          type: 'link',
          color: '#007AFF'
        }
      ]
    },
    {
      id: 'store',
      items: [
        {
          id: 'appstore',
          icon: '📦',
          label: 'App Store',
          type: 'link',
          color: '#007AFF'
        },
        {
          id: 'wallet',
          icon: '💳',
          label: 'Plånbok & Apple Pay',
          type: 'link',
          color: '#000000'
        }
      ]
    },
    {
      id: 'system',
      items: [
        {
          id: 'passwords',
          icon: '🔑',
          label: 'Lösenord',
          type: 'link',
          color: '#8E8E93'
        },
        {
          id: 'mail',
          icon: '✉️',
          label: 'Mail',
          type: 'link',
          color: '#007AFF'
        },
        {
          id: 'contacts',
          icon: '👥',
          label: 'Kontakter',
          type: 'link',
          color: '#8E8E93'
        },
        {
          id: 'calendar',
          icon: '📅',
          label: 'Kalender',
          type: 'link',
          color: '#FF3B30'
        },
        {
          id: 'notes',
          icon: '📝',
          label: 'Anteckningar',
          type: 'link',
          color: '#FFCC00'
        }
      ]
    }
  ]);

  const handleToggle = (sectionId: string, itemId: string) => {
    setSettings(prevSettings =>
      prevSettings.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId && item.type === 'toggle'
                  ? { ...item, enabled: !item.enabled }
                  : item
              )
            }
          : section
      );
    )
  };

  const renderSettingsItem = (item: SettingsItem, sectionId: string) => {
    return (
      <div
        key={item.id}
        className="settings-app__item"
        onClick={() => item.type === 'link' && console.log(`Navigate to ${item.label}`)}
      >
        <div className="settings-app__item-left">
          <div
            className="settings-app__item-icon"
            style={{ background: item.color || '#8E8E93' }}
          >
            {item.icon}
          </div>
          <span className="settings-app__item-label">{item.label}</span>
        </div>
        <div className="settings-app__item-right">
          {item.type === 'toggle' && (
            <button
              className={`settings-app__toggle ${item.enabled ? 'settings-app__toggle--on' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(sectionId, item.id)
              }}
            >
              <span className="settings-app__toggle-thumb"></span>
            </button>
          )}
          {item.type === 'link' && (
            <>
              {item.value && <span className="settings-app__item-value">{item.value}</span>}
              <span className="settings-app__item-arrow">›</span>
            </>
          )}
          {item.type === 'info' && item.value && (
            <span className="settings-app__item-value">{item.value}</span>
          )}
        </div>
      </div>
    )
  };

  return (
    <div className="settings-app">
      <div className="settings-app__header">
        <button className="settings-app__back" onClick={onClose}>
          ‹ Tillbaka
        </button>
        <h1 className="settings-app__title">Inställningar</h1>
      </div>

      <div className="settings-app__content">
        <div className="settings-app__search">
          <div className="settings-app__search-icon">🔍</div>
          <input
            type="text"
            className="settings-app__search-input"
            placeholder="Sök"
          />
        </div>

        {settings.map((section) => (
          <div key={section.id} className="settings-app__section">
            {section.title && (
              <h2 className="settings-app__section-title">{section.title}</h2>
            )}
            <div className="settings-app__section-content">
              {section.items.map((item) => renderSettingsItem(item, section.id))}
            </div>
          </div>
        ))}

        <div className="settings-app__footer">
          <div className="settings-app__footer-item">
            <span className="settings-app__footer-icon">ℹ️</span>
            <span className="settings-app__footer-text">iPhone 16 Pro</span>
          </div>
          <div className="settings-app__footer-item">
            <span className="settings-app__footer-icon">📱</span>
            <span className="settings-app__footer-text">iOS 18.0</span>
          </div>
          <div className="settings-app__footer-item">
            <span className="settings-app__footer-icon">💾</span>
            <span className="settings-app__footer-text">256 GB</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SettingsApp;