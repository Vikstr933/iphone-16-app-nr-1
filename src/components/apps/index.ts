import React from 'react';
import MessagesApp from './MessagesApp';
import CameraApp from './CameraApp';
import SafariApp from './SafariApp';
import SettingsApp from './SettingsApp';
import WeatherApp from './WeatherApp';
import MusicApp from './MusicApp';

export interface AppComponent {
  component: React.ComponentType<{ onClose: () => void }>;
  name: string
}

export const appRegistry: Record<string, AppComponent> = {
  messages: {
    component: MessagesApp,
    name: 'Meddelanden'
  },
  camera: {
    component: CameraApp,
    name: 'Kamera'
  },
  safari: {
    component: SafariApp,
    name: 'Safari'
  },
  settings: {
    component: SettingsApp,
    name: 'Inställningar'
  },
  weather: {
    component: WeatherApp,
    name: 'Väder'
  },
  music: {
    component: MusicApp,
    name: 'Musik'
  },
  facetime: {
    component: () => null,
    name: 'FaceTime'
  },
  calendar: {
    component: () => null,
    name: 'Kalender'
  },
  photos: {
    component: () => null,
    name: 'Foton'
  },
  mail: {
    component: () => null,
    name: 'Mail'
  },
  clock: {
    component: () => null,
    name: 'Klocka'
  },
  maps: {
    component: () => null,
    name: 'Kartor'
  },
  wallet: {
    component: () => null,
    name: 'Wallet'
  },
  notes: {
    component: () => null,
    name: 'Anteckningar'
  },
  reminders: {
    component: () => null,
    name: 'Påminnelser'
  },
  stocks: {
    component: () => null,
    name: 'Aktier'
  },
  health: {
    component: () => null,
    name: 'Hälsa'
  },
  home: {
    component: () => null,
    name: 'Hem'
  },
  appstore: {
    component: () => null,
    name: 'App Store'
  },
  books: {
    component: () => null,
    name: 'Böcker'
  },
  podcasts: {
    component: () => null,
    name: 'Podcasts'
  },
  tv: {
    component: () => null,
    name: 'TV'
  },
  files: {
    component: () => null,
    name: 'Filer'
  },
  phone: {
    component: () => null,
    name: 'Telefon'
  }
};

export const getAppComponent = (appId: string): AppComponent | null => {
  return appRegistry[appId] || null
};

export const hasAppImplementation = (appId: string): boolean => {
  const app = appRegistry[appId];
  return app !== undefined && app.component !== null && app.component !== (() => null)
};

export default appRegistry;
