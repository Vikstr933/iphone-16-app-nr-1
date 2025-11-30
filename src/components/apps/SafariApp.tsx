import React, { useState } from 'react';
import './SafariApp.css';

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string
}

interface SafariAppProps {
  onClose: () => void
}

const SafariApp: React.FC<SafariAppProps> = ({ onClose }) => {
  const [activeTabId, setActiveTabId] = useState('1');
  const [showTabs, setShowTabs] = useState(false);
  const [url, setUrl] = useState('apple.com');
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      title: 'Apple',
      url: 'apple.com',
      favicon: '🍎'
    },
    {
      id: '2',
      title: 'Google',
      url: 'google.com',
      favicon: '🔍'
    },
    {
      id: '3',
      title: 'YouTube',
      url: 'youtube.com',
      favicon: '▶️'
    }
  ]);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setUrl(tab.url)
    }
    setShowTabs(false)
  };

  const handleNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'Ny flik',
      url: '',
      favicon: '🌐'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setUrl('');
    setShowTabs(false)
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
      setUrl(newTabs[0].url)
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing page...')
  };

  const handleShare = () => {
    console.log('Sharing page...')
  };

  return (
    <div className="safari-app">
      {showTabs ? (
        <div className="safari-app__tabs-view">
          <div className="safari-app__tabs-header">
            <button
              className="safari-app__tabs-done"
              onClick={() => setShowTabs(false)}
            >
              Klar
            </button>
            <span className="safari-app__tabs-count">{tabs.length} flik{tabs.length !== 1 ? 'ar' : ''}</span>
            <button
              className="safari-app__tabs-new"
              onClick={handleNewTab}
            >
              +
            </button>
          </div>

          <div className="safari-app__tabs-grid">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`safari-app__tab-card ${activeTabId === tab.id ? 'safari-app__tab-card--active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <button
                  className="safari-app__tab-close"
                  onClick={(e) => handleCloseTab(tab.id, e)}
                >
                  ×
                </button>
                <div className="safari-app__tab-preview">
                  <div className="safari-app__tab-favicon">{tab.favicon}</div>
                  <div className="safari-app__tab-title">{tab.title}</div>
                  <div className="safari-app__tab-url">{tab.url}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="safari-app__header">
            <div className="safari-app__toolbar">
              <button className="safari-app__toolbar-button" onClick={handleRefresh}>
                <span className="safari-app__icon">↻</span>
              </button>
              <button className="safari-app__toolbar-button" onClick={handleShare}>
                <span className="safari-app__icon">⬆</span>
              </button>
              <button
                className="safari-app__toolbar-button safari-app__toolbar-button--tabs"
                onClick={() => setShowTabs(true)}
              >
                <span className="safari-app__tabs-icon">
                  <span className="safari-app__tabs-icon-square"></span>
                  <span className="safari-app__tabs-count-badge">{tabs.length}</span>
                </span>
              </button>
            </div>

            <div className="safari-app__address-bar">
              <div className="safari-app__address-bar-content">
                <span className="safari-app__lock-icon">🔒</span>
                <input
                  type="text"
                  className="safari-app__url-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Sök eller ange webbadress"
                />
                <button className="safari-app__refresh-button" onClick={handleRefresh}>
                  ↻
                </button>
              </div>
            </div>
          </div>

          <div className="safari-app__content">
            <div className="safari-app__webpage">
              <div className="safari-app__webpage-header">
                <div className="safari-app__webpage-logo">{activeTab?.favicon}</div>
                <h1 className="safari-app__webpage-title">{activeTab?.title}</h1>
              </div>

              <div className="safari-app__webpage-body">
                <div className="safari-app__hero">
                  <h2 className="safari-app__hero-title">Välkommen till {activeTab?.title}</h2>
                  <p className="safari-app__hero-text">
                    Detta är en mockup av en webbsida i Safari-appen.
                  </p>
                </div>

                <div className="safari-app__sections">
                  <div className="safari-app__section">
                    <h3 className="safari-app__section-title">Funktioner</h3>
                    <div className="safari-app__cards">
                      <div className="safari-app__card">
                        <div className="safari-app__card-icon">🚀</div>
                        <h4 className="safari-app__card-title">Snabb</h4>
                        <p className="safari-app__card-text">Blixtsnabb laddning</p>
                      </div>
                      <div className="safari-app__card">
                        <div className="safari-app__card-icon">🔒</div>
                        <h4 className="safari-app__card-title">Säker</h4>
                        <p className="safari-app__card-text">Skyddad surfning</p>
                      </div>
                      <div className="safari-app__card">
                        <div className="safari-app__card-icon">⚡</div>
                        <h4 className="safari-app__card-title">Kraftfull</h4>
                        <p className="safari-app__card-text">Moderna funktioner</p>
                      </div>
                    </div>
                  </div>

                  <div className="safari-app__section">
                    <h3 className="safari-app__section-title">Innehåll</h3>
                    <div className="safari-app__content-list">
                      <div className="safari-app__content-item">
                        <div className="safari-app__content-icon">📰</div>
                        <div className="safari-app__content-info">
                          <h4 className="safari-app__content-title">Nyheter</h4>
                          <p className="safari-app__content-description">Senaste nyheterna</p>
                        </div>
                      </div>
                      <div className="safari-app__content-item">
                        <div className="safari-app__content-icon">🎬</div>
                        <div className="safari-app__content-info">
                          <h4 className="safari-app__content-title">Video</h4>
                          <p className="safari-app__content-description">Populära videor</p>
                        </div>
                      </div>
                      <div className="safari-app__content-item">
                        <div className="safari-app__content-icon">📱</div>
                        <div className="safari-app__content-info">
                          <h4 className="safari-app__content-title">Produkter</h4>
                          <p className="safari-app__content-description">Utforska produkter</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="safari-app__bottom-bar">
            <button className="safari-app__bottom-button">
              <span className="safari-app__bottom-icon">◀</span>
            </button>
            <button className="safari-app__bottom-button">
              <span className="safari-app__bottom-icon">▶</span>
            </button>
            <button className="safari-app__bottom-button" onClick={handleShare}>
              <span className="safari-app__bottom-icon">⬆</span>
            </button>
            <button className="safari-app__bottom-button">
              <span className="safari-app__bottom-icon">📖</span>
            </button>
            <button className="safari-app__bottom-button" onClick={() => setShowTabs(true)}>
              <span className="safari-app__bottom-icon">⊞</span>
            </button>
          </div>
        </>
      )}

      <button className="safari-app__close" onClick={onClose}>
        ✕
      </button>
    </div>
  )
};

export default SafariApp;