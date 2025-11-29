import React, { useState, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import AppGrid from './components/AppGrid';
import Dock from './components/Dock';
import { apps, dockApps } from './data/apps';
import './App.css';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [signalStrength] = useState<number>(4);
  const [wifiStrength] = useState<number>(3);
  const [batteryLevel] = useState<number>(85);
  const [isCharging] = useState<boolean>(false);

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

  const handleAppClick = (appId: string) => {
    console.log(`App clicked: ${appId}`)
  };

  const handleDockAppClick = (appId: string) => {
    console.log(`Dock app clicked: ${appId}`)
  };

  return (
    <div className="app">
      <div className="app__wallpaper" />
      
      <StatusBar
        time={currentTime}
        signalStrength={signalStrength}
        wifiStrength={wifiStrength}
        batteryLevel={batteryLevel}
        isCharging={isCharging}
      />

      <main className="app__content">
        <AppGrid apps={apps} onAppClick={handleAppClick} />
      </main>

      <Dock apps={dockApps} onAppClick={handleDockAppClick} />
    </div>
  )
};

export default App;