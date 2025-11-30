import React, { useState, useEffect, useRef } from 'react';
import './AppView.css';

interface AppViewProps {
  appId: string;
  appName: string;
  appIcon: string;
  appColor: string;
  onClose: () => void;
  children?: React.ReactNode;
  startPosition?: { x: number; y: number }
}

const AppView: React.FC<AppViewProps> = ({
  appId,
  appName,
  appIcon,
  appColor,
  onClose,
  children,
  startPosition
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchCurrentY, setTouchCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 100;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = ''
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose()
    }, 300)
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchStartY(touch.clientY);
      setTouchCurrentY(touch.clientY)
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch && touchStartY > 0) {
      const deltaY = touch.clientY - touchStartY;
      if (deltaY > 0) {
        setTouchCurrentY(touch.clientY);
        setIsDragging(true);
        e.preventDefault()
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      const deltaY = touchCurrentY - touchStartY;
      if (deltaY > dragThreshold) {
        handleClose()
      } else {
        setTouchCurrentY(touchStartY)
      }
      setIsDragging(false)
    }
    setTouchStartY(0)
  };

  const dragDistance = isDragging ? Math.max(0, touchCurrentY - touchStartY) : 0;
  const dragScale = Math.max(0.85, 1 - dragDistance / 1000);
  const dragOpacity = Math.max(0.3, 1 - dragDistance / 300);

  return (
    <div 
      className={`app-view ${isClosing ? 'app-view--closing' : ''}`}
      data-app-id={appId}
      style={{
        '--start-x': startPosition ? `${startPosition.x}px` : '50%',
        '--start-y': startPosition ? `${startPosition.y}px` : '50%'
      } as React.CSSProperties}
    >
      <div 
        className="app-view__overlay" 
        onClick={handleClose}
        style={{ opacity: dragOpacity }}
      />
      
      <div 
        ref={containerRef}
        className="app-view__container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragDistance}px) scale(${dragScale})`,
          borderRadius: isDragging ? `${Math.min(dragDistance / 3, 30)}px` : '0px'
        }}
      >
        <div className="app-view__status-bar">
          <div className="app-view__status-bar-left">
            <span className="app-view__time">
              {new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="app-view__notch" />
          <div className="app-view__status-bar-right">
            <div className="app-view__signal">
              <div className="app-view__signal-bar app-view__signal-bar--active" />
              <div className="app-view__signal-bar app-view__signal-bar--active" />
              <div className="app-view__signal-bar app-view__signal-bar--active" />
              <div className="app-view__signal-bar app-view__signal-bar--active" />
            </div>
            <div className="app-view__wifi">📶</div>
            <div className="app-view__battery">
              <div className="app-view__battery-level" style={{ width: '85%' }} />
              <div className="app-view__battery-tip" />
            </div>
          </div>
        </div>

        <div className="app-view__home-indicator" />

        <div className="app-view__content">
          {children}
        </div>
      </div>
    </div>
  )
};

export default AppView;