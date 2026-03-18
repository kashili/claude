import React from 'react'

export default function Processing({ sessionId }) {
  const handleSignOut = async () => {
    try {
      await fetch('/api/vote/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
    } catch {
      // ignore
    }
    window.location.reload()
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">7</div>
        <span className="screen-title">Processing</span>
      </div>
      <div className="processing-container">
        <div style={{ marginBottom: '24px' }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="34" fill="#E6F4EA" stroke="#28A745" strokeWidth="3"/>
            <path d="M20 36L30 46L52 24" stroke="#28A745" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="processing-text">PROCESSING...</div>
        <div className="processing-sub">
          Your vote initiation has been submitted successfully.<br/>
          An email notification has been sent to all relevant parties.
        </div>
        <div style={{
          background: '#F0F7FF',
          border: '1px solid #CCE5F5',
          borderRadius: '4px',
          padding: '16px 24px',
          marginBottom: '36px',
          fontSize: '13px',
          color: '#555',
          fontFamily: 'Arial, sans-serif'
        }}>
          Email notifications dispatched to:<br/>
          <strong>krishna.ashili@wipro.com</strong> &nbsp;|&nbsp; <strong>36kashili@gmail.com</strong>
        </div>
        <button className="btn-signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
