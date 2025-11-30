import React, { useState, useRef } from 'react';
import './AppGrid.css';
import { AppIcon as AppIconType } from '../types';
import AppIcon from './AppIcon';

interface AppGridProps {
  apps: AppIconType[];
  onAppClick?: (appId: string, position: { x: number; y: number }) => void
}

const AppGrid: React.FC<AppGridProps> = ({ apps, onAppClick }) => {
  const [pressedAppId, setPressedAppId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const maxRow = Math.max(...apps.map(app => app.position.row));
  const maxCol = Math.max(...apps.map(app => app.position.col));

  const rows = [];
  for (let row = 0; row <= maxRow; row++) {
    const rowApps = apps.filter(app => app.position.row === row);
    rowApps.sort((a, b) => a.position.col - b.position.col);
    rows.push(rowApps)
  }

  const handleAppClick = (appId: string, iconElement: HTMLElement) => {
    setPressedAppId(appId);
    
    const rect = iconElement.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    setTimeout(() => {
      setPressedAppId(null);
      if (onAppClick) {
        onAppClick(appId, position)
      }
    }, 150)
  };

  return (
    <div className="app-grid" ref={gridRef} role="grid" aria-label="App-rutnät">
      {rows.map((rowApps, rowIndex) => (
        <div key={rowIndex} className="app-grid__row" role="row">
          {Array.from({ length: maxCol + 1 }).map((_, colIndex) => {
            const app = rowApps.find(a => a.position.col === colIndex);
            return (
              <div key={colIndex} className="app-grid__cell" role="gridcell">
                {app && (
                  <AppIcon
                    app={app}
                    onClick={(iconElement) => handleAppClick(app.id, iconElement)}
                    isPressed={pressedAppId === app.id}
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
};

export default AppGrid;