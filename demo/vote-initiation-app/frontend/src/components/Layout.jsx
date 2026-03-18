import React from 'react'

export default function Layout({ children, currentScreen }) {
  const totalScreens = 7

  return (
    <div className="app-container">
      <header className="imf-header">
        <div className="imf-header-inner">
          <div className="imf-logo-area">
            <div className="imf-logo-circle">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="#003A5C" strokeWidth="2" fill="white"/>
                <ellipse cx="20" cy="20" rx="8" ry="19" stroke="#003A5C" strokeWidth="1.5" fill="none"/>
                <line x1="1" y1="20" x2="39" y2="20" stroke="#003A5C" strokeWidth="1.5"/>
                <line x1="3" y1="13" x2="37" y2="13" stroke="#003A5C" strokeWidth="1"/>
                <line x1="3" y1="27" x2="37" y2="27" stroke="#003A5C" strokeWidth="1"/>
              </svg>
            </div>
            <div className="imf-logo-text-group">
              <span className="imf-logo-main">IMF</span>
              <span className="imf-logo-sub">INTERNATIONAL MONETARY FUND</span>
            </div>
          </div>
          <div className="imf-header-divider" />
          <span className="imf-header-title">Vote Initiation System</span>
        </div>
      </header>

      <main className="main-content">
        <div style={{ width: '100%', maxWidth: '680px' }}>
          {currentScreen > 1 && currentScreen < 8 && (
            <div className="step-indicator">
              {Array.from({ length: totalScreens }, (_, i) => (
                <div
                  key={i}
                  className={`step-dot ${i + 1 === currentScreen ? 'active' : i + 1 < currentScreen ? 'completed' : ''}`}
                />
              ))}
            </div>
          )}
          {children}
        </div>
      </main>

      <footer className="imf-footer">
        &copy; {new Date().getFullYear()} International Monetary Fund. All rights reserved. | Vote Initiation System
      </footer>
    </div>
  )
}
