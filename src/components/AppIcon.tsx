import React, { useState } from 'react';
import './AppIcon.css';
import { AppIconProps } from '../types';

const AppIcon: React.FC<AppIconProps> = ({ app, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    setIsPressed(true)
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    if (onClick) {
      onClick()
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true)
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (onClick) {
      onClick()
    }
  };

  const handleMouseLeave = () => {
    setIsPressed(false)
  };

  return (
    <div
      className={`app-icon ${isPressed ? 'app-icon--pressed' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={app.name}
    >
      <div
        className="app-icon__container"
        style={{
          background: app.gradient || app.color
        }}
      >
        <span className="app-icon__emoji" role="img" aria-hidden="true">
          {app.icon}
        </span>
      </div>
      <span className="app-icon__label">{app.name}</span>
    </div>
  )
};

export default AppIcon;