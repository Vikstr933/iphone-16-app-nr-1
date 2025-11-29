export interface AppIcon {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient?: string;
  position: {
    row: number;
    col: number
  }
}

export interface DockApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient?: string
}

export interface StatusBarProps {
  time: string;
  signalStrength: number;
  wifiStrength: number;
  batteryLevel: number;
  isCharging?: boolean
}

export interface HomeScreenData {
  apps: AppIcon[];
  dockApps: DockApp[];
  wallpaper: string
}

export interface AppIconProps {
  app: AppIcon;
  onClick?: () => void
}

export interface DockProps {
  apps: DockApp[];
  onAppClick?: (appId: string) => void
}

export interface WallpaperProps {
  imageUrl?: string;
  gradient?: string
}

export type AppCategory = 'communication' | 'media' | 'productivity' | 'utility' | 'social' | 'entertainment';

export interface AppMetadata {
  id: string;
  name: string;
  category: AppCategory;
  icon: string;
  color: string;
  gradient?: string;
  badge?: number;
  folder?: string
}
