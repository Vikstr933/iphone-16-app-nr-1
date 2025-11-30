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
  description?: string
}

export interface OpenApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient?: string
}

export interface AppState {
  currentApp: OpenApp | null;
  isAnimating: boolean;
  animationOrigin?: {
    x: number;
    y: number
  }
}

export interface NavigationState {
  history: string[];
  currentIndex: number;
  canGoBack: boolean;
  canGoForward: boolean
}

export interface AppViewProps {
  appId: string;
  appName: string;
  appIcon: string;
  appColor: string;
  onClose: () => void;
  children?: React.ReactNode
}

export interface AppComponentProps {
  onClose: () => void;
  onNavigate?: (route: string) => void;
  initialRoute?: string
}

export interface GestureState {
  startY: number;
  currentY: number;
  isDragging: boolean;
  velocity: number
}

export interface SwipeGestureConfig {
  threshold: number;
  velocityThreshold: number;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number
}

export interface AppTransition {
  type: 'open' | 'close' | 'switch';
  from?: OpenApp;
  to?: OpenApp;
  origin?: {
    x: number;
    y: number
  }
}

export interface NotificationData {
  id: string;
  appId: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  badge?: number
}

export interface ControlCenterState {
  isOpen: boolean;
  brightness: number;
  volume: number;
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  airplaneModeEnabled: boolean;
  doNotDisturbEnabled: boolean
}

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  recentSearches: string[]
}

export interface SearchResult {
  id: string;
  type: 'app' | 'contact' | 'message' | 'web';
  title: string;
  subtitle?: string;
  icon: string;
  action: () => void
}

export interface HomeScreenState {
  currentPage: number;
  totalPages: number;
  isEditing: boolean;
  selectedAppId?: string
}

export interface AppGridState {
  apps: AppIcon[];
  layout: 'grid' | 'list';
  sortBy: 'name' | 'recent' | 'custom'
}

export interface DockState {
  apps: DockApp[];
  maxApps: number;
  isCustomizable: boolean
}

export interface SystemState {
  batteryLevel: number;
  isCharging: boolean;
  signalStrength: number;
  wifiStrength: number;
  time: string;
  date: string;
  notifications: NotificationData[];
  unreadCount: number
}

export interface AppSettings {
  appId: string;
  notifications: boolean;
  backgroundRefresh: boolean;
  cellularData: boolean;
  location: 'never' | 'ask' | 'while_using' | 'always'
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  textSize: 'small' | 'medium' | 'large' | 'xlarge';
  reduceMotion: boolean;
  hapticFeedback: boolean;
  soundEffects: boolean
}
