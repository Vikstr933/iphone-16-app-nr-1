import React, { useState, useEffect } from 'react';
import './StatusBar.css';
import { StatusBarProps } from '../types';

const StatusBar: React.FC<StatusBarProps> = ({
  time,
  signalStrength,
  wifiStrength,
  batteryLevel,
  isCharging = false
}) => {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`)
    }, 1000);

    return () => clearInterval(interval)
  }, []);

  const renderSignalBars = () => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
      bars.push(
        <div
          key={i}
          className={`status-bar__signal-bar ${i < signalStrength ? 'status-bar__signal-bar--active' : ''}`}
          style={{ height: `${(i + 1) * 3}px` }}
        />
      )
    }
    return bars
  };

  const renderWifiBars = () => {
    const bars = [];
    for (let i = 0; i < 3; i++) {
      bars.push(
        <div
          key={i}
          className={`status-bar__wifi-bar ${i < wifiStrength ? 'status-bar__wifi-bar--active' : ''}`}
          style={{
            height: `${(i + 1) * 3}px`,
            width: `${(i + 1) * 2}px`
          }}
        />
      )
    }
    return bars
  };

  const getBatteryColor = () => {
    if (isCharging) return '#34C759';
    if (batteryLevel <= 20) return '#FF3B30';
    if (batteryLevel <= 50) return '#FF9500';
    return '#FFFFFF'
  };

  return (
    <div className="status-bar">
      <div className="status-bar__left">
        <div className="status-bar__time">{currentTime}</div>
      </div>

      <div className="status-bar__notch" />

      <div className="status-bar__right">
        <div className="status-bar__signal">
          {renderSignalBars()}
        </div>

        <div className="status-bar__wifi">
          {renderWifiBars()}
        </div>

        <div className="status-bar__battery">
          <div className="status-bar__battery-container">
            <div
              className="status-bar__battery-level"
              style={{
                width: `${batteryLevel}%`,
                backgroundColor: getBatteryColor()
              }}
            />
            {isCharging && (
              <div className="status-bar__battery-charging">⚡</div>
            )}
          </div>
          <div className="status-bar__battery-tip" />
          <span className="status-bar__battery-percentage">{batteryLevel}%</span>
        </div>
      </div>
    </div>
  )
};

export default StatusBar;