import React, { useState } from 'react'

export default function VoteNumber({ sessionId, onSuccess }) {
  const [voteNumber, setVoteNumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!/^[a-zA-Z0-9]{6}$/.test(voteNumber)) {
      setError('Vote number must be exactly 6 alphanumeric characters (letters and numbers only).')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/vote/vote-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, voteNumber })
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess()
      } else {
        setError(data.message || 'Failed to save vote number')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">2</div>
        <span className="screen-title">Vote Number</span>
      </div>
      <div className="screen-body">
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', fontFamily: 'Arial, sans-serif' }}>
          Enter the unique 6-digit alphanumeric vote reference code for this resolution.
        </p>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label className="form-label">Vote Reference Code</label>
          <input
            type="text"
            className="form-input"
            value={voteNumber}
            onChange={e => setVoteNumber(e.target.value.toUpperCase())}
            placeholder="e.g. AB1234"
            maxLength={6}
            style={{ letterSpacing: '4px', fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}
          />
          <p className="form-hint">6 characters — letters and numbers only (e.g. AB1234, FR2026)</p>
        </div>
        <div className="action-buttons">
          <button type="button" className="btn-cancel" onClick={() => { setVoteNumber(''); setError('') }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Cancel
          </button>
          <button type="button" className="btn-submit" onClick={handleSubmit} disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loading ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}
