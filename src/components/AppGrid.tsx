import React from 'react';
import './AppGrid.css';
import { AppIcon as AppIconType } from '../types';
import AppIcon from './AppIcon';

interface AppGridProps {
  apps: AppIconType[];
  onAppClick?: (appId: string) => void
}

const AppGrid: React.FC<AppGridProps> = ({ apps, onAppClick }) => {
  const maxRow = Math.max(...apps.map(app => app.position.row));
  const maxCol = Math.max(...apps.map(app => app.position.col));

  const rows = [];
  for (let row = 0; row <= maxRow; row++) {
    const rowApps = apps.filter(app => app.position.row === row);
    rowApps.sort((a, b) => a.position.col - b.position.col);
    rows.push(rowApps)
  }

  const handleAppClick = (appId: string) => {
    if (onAppClick) {
      onAppClick(appId)
    }
  };

  return (
    <div className="app-grid" role="grid" aria-label="Hemskärm appar">
      {rows.map((rowApps, rowIndex) => (
        <div key={rowIndex} className="app-grid__row" role="row">
          {rowApps.map((app) => (
            <div key={app.id} className="app-grid__cell" role="gridcell">
              <AppIcon app={app} onClick={() => handleAppClick(app.id)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default AppGrid;