import React, { useState, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import AppGrid from './components/AppGrid';
import Dock from './components/Dock';
import { apps, dockApps } from './data/apps';
import { appRegistry } from './components/apps';
import './App.css';

interface OpenApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  position?: { x: number; y: number }
}

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [signalStrength] = useState<number>(4);
  const [wifiStrength] = useState<number>(3);
  const [batteryLevel] = useState<number>(85);
  const [isCharging] = useState<boolean>(false);
  const [openApp, setOpenApp] = useState<OpenApp | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [appPosition, setAppPosition] = useState<{ x: number; y: number } | null>(null);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragDistance, setDragDistance] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`)
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval)
  }, []);

  const handleAppClick = (appId: string, event?: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;

    const app = [...apps, ...dockApps].find(a => a.id === appId);
    if (!app) return;

    let position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    if (event) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      position = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    }

    setAppPosition(position);
    setIsAnimating(true);

    setTimeout(() => {
      setOpenApp({
        id: app.id,
        name: app.name,
        icon: app.icon,
        color: app.color,
        position
      });
      setIsAnimating(false)
    }, 300)
  };

  const handleCloseApp = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setOpenApp(null);
      setAppPosition(null);
      setIsAnimating(false)
    }, 300)
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!openApp) return;
    const touch = e.touches[0];
    if (touch) {
      setTouchStartY(touch.clientY);
      setIsDragging(false);
      setDragDistance(0)
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!openApp || touchStartY === 0) return;
    const touch = e.touches[0];
    if (touch) {
      const distance = touch.clientY - touchStartY;
      if (distance > 0) {
        setIsDragging(true);
        setDragDistance(distance)
      }
    }
  };

  const handleTouchEnd = () => {
    if (!openApp || !isDragging) {
      setTouchStartY(0);
      setIsDragging(false);
      setDragDistance(0);
      return
    };
    if (dragDistance > 150) {
      handleCloseApp()
    }

    setTouchStartY(0);
    setIsDragging(false);
    setDragDistance(0)
  };

  const AppComponent = openApp && appRegistry[openApp.id]?.component;

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__content">
          <StatusBar
            time={currentTime}
            signalStrength={signalStrength}
            wifiStrength={wifiStrength}
            batteryLevel={batteryLevel}
            isCharging={isCharging}
          />

          <div className={`app__home-screen ${openApp ? 'app__home-screen--hidden' : ''}`}>
            <AppGrid
              apps={apps}
              onAppClick={(appId, event) => handleAppClick(appId, event)}
            />
            <Dock
              apps={dockApps}
              onAppClick={(appId, event) => handleAppClick(appId, event)}
            />
          </div>

          {openApp && (
            <div
              className={`app__view-container ${
                isAnimating ? 'app__view-container--animating' : 'app__view-container--open'
              } ${isDragging ? 'app__view-container--dragging' : ''}`}
              style={{
                transform: isDragging ? `translateY(${dragDistance}px)` : undefined,
                opacity: isDragging ? Math.max(0.5, 1 - dragDistance / 500) : undefined
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {appPosition && (
                <div
                  className="app__launch-origin"
                  style={{
                    left: `${appPosition.x}px`,
                    top: `${appPosition.y}px`
                  }}
                />
              )}

              <div className="app__view-wrapper">
                <div className="app__gesture-indicator" />
                {AppComponent && <AppComponent onClose={handleCloseApp} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default App;