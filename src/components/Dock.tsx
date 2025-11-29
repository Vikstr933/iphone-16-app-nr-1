import React, { useState } from 'react';
import './Dock.css';
import { DockProps } from '../types';

const Dock: React.FC<DockProps> = ({ apps, onAppClick }) => {
  const [pressedAppId, setPressedAppId] = useState<string | null>(null);

  const handleTouchStart = (appId: string) => {
    setPressedAppId(appId)
  };

  const handleTouchEnd = (appId: string) => {
    setPressedAppId(null);
    if (onAppClick) {
      onAppClick(appId)
    }
  };

  const handleMouseDown = (appId: string) => {
    setPressedAppId(appId)
  };

  const handleMouseUp = (appId: string) => {
    setPressedAppId(null);
    if (onAppClick) {
      onAppClick(appId)
    }
  };

  const handleMouseLeave = () => {
    setPressedAppId(null)
  };

  return (
    <div className="dock" role="navigation" aria-label="Dock med snabbåtkomst till appar">
      <div className="dock__container">
        <div className="dock__background" />
        <div className="dock__apps">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`dock__app ${pressedAppId === app.id ? 'dock__app--pressed' : ''}`}
              onTouchStart={() => handleTouchStart(app.id)}
              onTouchEnd={() => handleTouchEnd(app.id)}
              onMouseDown={() => handleMouseDown(app.id)}
              onMouseUp={() => handleMouseUp(app.id)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              aria-label={app.name}
            >
              <div
                className="dock__app-icon"
                style={{
                  background: app.gradient || app.color
                }}
              >
                <span className="dock__app-emoji" role="img" aria-label={app.name}>
                  {app.icon}
                </span>
                <div className="dock__app-shine" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Dock;