import { AppIcon, DockApp } from '../types';

export const apps: AppIcon[] = [
  {
    id: 'facetime',
    name: 'FaceTime',
    icon: '📹',
    color: '#00C853',
    gradient: 'linear-gradient(135deg, #00C853 0%, #00E676 100%)',
    position: { row: 0, col: 0 }
  },
  {
    id: 'calendar',
    name: 'Kalender',
    icon: '📅',
    color: '#FF3B30',
    gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
    position: { row: 0, col: 1 }
  },
  {
    id: 'photos',
    name: 'Foton',
    icon: '🌸',
    color: '#FF2D55',
    gradient: 'linear-gradient(135deg, #FF2D55 0%, #FF6B9D 100%)',
    position: { row: 0, col: 2 }
  },
  {
    id: 'camera',
    name: 'Kamera',
    icon: '📷',
    color: '#8E8E93',
    gradient: 'linear-gradient(135deg, #5E5E63 0%, #8E8E93 100%)',
    position: { row: 0, col: 3 }
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: '✉️',
    color: '#007AFF',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
    position: { row: 1, col: 0 }
  },
  {
    id: 'clock',
    name: 'Klocka',
    icon: '⏰',
    color: '#FF9500',
    gradient: 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)',
    position: { row: 1, col: 1 }
  },
  {
    id: 'maps',
    name: 'Kartor',
    icon: '🗺️',
    color: '#34C759',
    gradient: 'linear-gradient(135deg, #34C759 0%, #5DD879 100%)',
    position: { row: 1, col: 2 }
  },
  {
    id: 'weather',
    name: 'Väder',
    icon: '☀️',
    color: '#5AC8FA',
    gradient: 'linear-gradient(135deg, #5AC8FA 0%, #7DD3FC 100%)',
    position: { row: 1, col: 3 }
  },
  {
    id: 'reminders',
    name: 'Påminnelser',
    icon: '📝',
    color: '#FF3B30',
    gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
    position: { row: 2, col: 0 }
  },
  {
    id: 'notes',
    name: 'Anteckningar',
    icon: '📋',
    color: '#FFCC00',
    gradient: 'linear-gradient(135deg, #FFCC00 0%, #FFD93D 100%)',
    position: { row: 2, col: 1 }
  },
  {
    id: 'stocks',
    name: 'Aktier',
    icon: '📈',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
    position: { row: 2, col: 2 }
  },
  {
    id: 'books',
    name: 'Böcker',
    icon: '📚',
    color: '#FF9500',
    gradient: 'linear-gradient(135deg, #FF9500 0%, #FFAB40 100%)',
    position: { row: 2, col: 3 }
  },
  {
    id: 'appstore',
    name: 'App Store',
    icon: '🛍️',
    color: '#007AFF',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #0A84FF 100%)',
    position: { row: 3, col: 0 }
  },
  {
    id: 'podcasts',
    name: 'Podcasts',
    icon: '🎙️',
    color: '#8E2DE2',
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #A855F7 100%)',
    position: { row: 3, col: 1 }
  },
  {
    id: 'tv',
    name: 'TV',
    icon: '📺',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #000000 0%, #1C1C1E 100%)',
    position: { row: 3, col: 2 }
  },
  {
    id: 'music',
    name: 'Musik',
    icon: '🎵',
    color: '#FF2D55',
    gradient: 'linear-gradient(135deg, #FF2D55 0%, #FF6B9D 100%)',
    position: { row: 3, col: 3 }
  },
  {
    id: 'settings',
    name: 'Inställningar',
    icon: '⚙️',
    color: '#8E8E93',
    gradient: 'linear-gradient(135deg, #5E5E63 0%, #8E8E93 100%)',
    position: { row: 4, col: 0 }
  },
  {
    id: 'wallet',
    name: 'Plånbok',
    icon: '💳',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
    position: { row: 4, col: 1 }
  },
  {
    id: 'health',
    name: 'Hälsa',
    icon: '❤️',
    color: '#FF2D55',
    gradient: 'linear-gradient(135deg, #FF2D55 0%, #FF6B9D 100%)',
    position: { row: 4, col: 2 }
  },
  {
    id: 'home',
    name: 'Hem',
    icon: '🏠',
    color: '#FF9500',
    gradient: 'linear-gradient(135deg, #FF9500 0%, #FFAB40 100%)',
    position: { row: 4, col: 3 }
  }
];

export const dockApps: DockApp[] = [
  {
    id: 'phone',
    name: 'Telefon',
    icon: '📞',
    color: '#34C759',
    gradient: 'linear-gradient(135deg, #34C759 0%, #5DD879 100%)'
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: '🧭',
    color: '#007AFF',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)'
  },
  {
    id: 'messages',
    name: 'Meddelanden',
    icon: '💬',
    color: '#34C759',
    gradient: 'linear-gradient(135deg, #34C759 0%, #5DD879 100%)'
  },
  {
    id: 'music-dock',
    name: 'Musik',
    icon: '🎵',
    color: '#FF2D55',
    gradient: 'linear-gradient(135deg, #FF2D55 0%, #FF6B9D 100%)'
  }
];

export const wallpaperGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
