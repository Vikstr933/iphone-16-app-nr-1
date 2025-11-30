import React, { useState, useRef, useEffect } from 'react';
import './CameraApp.css';

type CameraMode = 'photo' | 'video' | 'portrait' | 'pano';
type FlashMode = 'auto' | 'on' | 'off';

interface CameraAppProps {
  onClose: () => void
}

const CameraApp: React.FC<CameraAppProps> = ({ onClose }) => {
  const [mode, setMode] = useState<CameraMode>('photo');
  const [flashMode, setFlashMode] = useState<FlashMode>('auto');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, []);

  const handleShutterClick = () => {
    if (mode === 'video') {
      if (isRecording) {
        setIsRecording(false);
        setRecordingTime(0);
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
          recordingIntervalRef.current = null
        }
      } else {
        setIsRecording(true);
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1)
        }, 1000)
      }
    } else {
      const shutterElement = document.querySelector('.camera-app__shutter-button');
      if (shutterElement) {
        shutterElement.classList.add('camera-app__shutter-button--flash');
        setTimeout(() => {
          shutterElement.classList.remove('camera-app__shutter-button--flash')
        }, 200)
      }
    }
  };

  const cycleFlashMode = () => {
    const modes: FlashMode[] = ['auto', 'on', 'off'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex])
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  };

  const formatRecordingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case 'auto':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
            <text x="16" y="20" fontSize="8" fontWeight="bold" fill="currentColor">A</text>
          </svg>
        );
      case 'on':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
          </svg>
        );
      case 'off':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
    }
  };

  return (
    <div className="camera-app">
      <div className="camera-app__viewfinder">
        <div className="camera-app__gradient-overlay" />
        
        {showGrid && (
          <div className="camera-app__grid">
            <div className="camera-app__grid-line camera-app__grid-line--vertical" style={{ left: '33.33%' }} />
            <div className="camera-app__grid-line camera-app__grid-line--vertical" style={{ left: '66.66%' }} />
            <div className="camera-app__grid-line camera-app__grid-line--horizontal" style={{ top: '33.33%' }} />
            <div className="camera-app__grid-line camera-app__grid-line--horizontal" style={{ top: '66.66%' }} />
          </div>
        )}

        <div className="camera-app__top-controls">
          <button 
            className="camera-app__control-button"
            onClick={onClose}
            aria-label="Stäng"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <button 
            className={`camera-app__control-button ${flashMode !== 'off' ? 'camera-app__control-button--active' : ''}`}
            onClick={cycleFlashMode}
            aria-label={`Blixt: ${flashMode}`}
          >
            {getFlashIcon()}
          </button>

          <button 
            className="camera-app__control-button"
            onClick={() => setShowGrid(!showGrid)}
            aria-label="Rutnät"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
              <line x1="3" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="2"/>
              <line x1="11" y1="3" x2="11" y2="21" stroke="currentColor" strokeWidth="2"/>
              <line x1="13" y1="3" x2="13" y2="21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {isRecording && (
          <div className="camera-app__recording-indicator">
            <div className="camera-app__recording-dot" />
            <span className="camera-app__recording-time">{formatRecordingTime(recordingTime)}</span>
          </div>
        )}

        <div className="camera-app__zoom-controls">
          <button 
            className={`camera-app__zoom-button ${zoom === 0.5 ? 'camera-app__zoom-button--active' : ''}`}
            onClick={() => handleZoomChange(0.5)}
          >
            .5
          </button>
          <button 
            className={`camera-app__zoom-button ${zoom === 1 ? 'camera-app__zoom-button--active' : ''}`}
            onClick={() => handleZoomChange(1)}
          >
            1×
          </button>
          <button 
            className={`camera-app__zoom-button ${zoom === 2 ? 'camera-app__zoom-button--active' : ''}`}
            onClick={() => handleZoomChange(2)}
          >
            2×
          </button>
          <button 
            className={`camera-app__zoom-button ${zoom === 5 ? 'camera-app__zoom-button--active' : ''}`}
            onClick={() => handleZoomChange(5)}
          >
            5×
          </button>
        </div>
      </div>

      <div className="camera-app__controls">
        <div className="camera-app__mode-selector">
          <button 
            className={`camera-app__mode-button ${mode === 'pano' ? 'camera-app__mode-button--active' : ''}`}
            onClick={() => setMode('pano')}
          >
            PANO
          </button>
          <button 
            className={`camera-app__mode-button ${mode === 'portrait' ? 'camera-app__mode-button--active' : ''}`}
            onClick={() => setMode('portrait')}
          >
            PORTRÄTT
          </button>
          <button 
            className={`camera-app__mode-button ${mode === 'photo' ? 'camera-app__mode-button--active' : ''}`}
            onClick={() => setMode('photo')}
          >
            FOTO
          </button>
          <button 
            className={`camera-app__mode-button ${mode === 'video' ? 'camera-app__mode-button--active' : ''}`}
            onClick={() => setMode('video')}
          >
            VIDEO
          </button>
        </div>

        <div className="camera-app__action-bar">
          <button className="camera-app__gallery-button" aria-label="Galleri">
            <div className="camera-app__gallery-thumbnail">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="24" height="24" rx="4" fill="#667eea"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
                <path d="M4 22L10 16L16 22L22 16L28 22V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V22Z" fill="white"/>
              </svg>
            </div>
          </button>

          <button 
            className={`camera-app__shutter-button ${isRecording ? 'camera-app__shutter-button--recording' : ''} ${mode === 'video' ? 'camera-app__shutter-button--video' : ''}`}
            onClick={handleShutterClick}
            aria-label={mode === 'video' ? (isRecording ? 'Stoppa inspelning' : 'Starta inspelning') : 'Ta foto'}
          >
            <div className="camera-app__shutter-inner" />
          </button>

          <button className="camera-app__flip-button" aria-label="Vänd kamera">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 8C12.6863 8 10 10.6863 10 14V18C10 21.3137 12.6863 24 16 24C19.3137 24 22 21.3137 22 18V14C22 10.6863 19.3137 8 16 8Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 4V8M16 24V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 6L16 4L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 26L16 28L20 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
};

export default CameraApp;