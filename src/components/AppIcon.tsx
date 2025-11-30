import React, { useState, useRef } from 'react';
import './AppIcon.css';
import { AppIconProps } from '../types';

interface ExtendedAppIconProps extends Omit<AppIconProps, 'onClick'> {
  onClick?: (iconElement: HTMLElement) => void;
  isPressed?: boolean
}

const AppIcon: React.FC<ExtendedAppIconProps> = ({ app, onClick, isPressed = false }) => {
  const [isLocalPressed, setIsLocalPressed] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = () => {
    setIsLocalPressed(true)
  };

  const handleTouchEnd = () => {
    setIsLocalPressed(false);
    if (onClick && iconRef.current) {
      onClick(iconRef.current)
    }
  };

  const handleMouseDown = () => {
    setIsLocalPressed(true)
  };

  const handleMouseUp = () => {
    setIsLocalPressed(false);
    if (onClick && iconRef.current) {
      onClick(iconRef.current)
    }
  };

  const handleMouseLeave = () => {
    setIsLocalPressed(false)
  };

  const isPressedState = isPressed || isLocalPressed;

  return (
    <div
      ref={iconRef}
      className={`app-icon ${isPressedState ? 'app-icon--pressed' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={app.name}
      data-app-id={app.id}
    >
      <div
        className="app-icon__container"
        style={{
          background: app.gradient || app.color
        }}
      >
        <span className="app-icon__emoji" role="img" aria-label={app.name}>
          {app.icon}
        </span>
      </div>
      <span className="app-icon__label">{app.name}</span>
    </div>
  )
};

export default AppIcon;