import React, { useState } from 'react'

export default function VotingType({ sessionId, onSuccess }) {
  const [selectedType, setSelectedType] = useState('RESOLUTION VOTE')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/vote/voting-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, votingType: selectedType })
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess()
      } else {
        setError(data.message || 'Failed to save voting type')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">4</div>
        <span className="screen-title">Voting Type</span>
      </div>
      <div className="screen-body">
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', fontFamily: 'Arial, sans-serif' }}>
          Select the type of vote to initiate.
        </p>
        {error && <div className="error-message">{error}</div>}
        <div className="radio-group">
          <label
            className={`radio-option ${selectedType === 'RESOLUTION VOTE' ? 'selected' : ''}`}
            onClick={() => setSelectedType('RESOLUTION VOTE')}
          >
            <input
              type="radio"
              name="votingType"
              value="RESOLUTION VOTE"
              checked={selectedType === 'RESOLUTION VOTE'}
              onChange={() => setSelectedType('RESOLUTION VOTE')}
            />
            <div>
              <div className="radio-label-main">Resolution Vote</div>
              <div className="radio-label-sub">Vote on a formal IMF resolution or policy statement</div>
            </div>
          </label>
          <label className="radio-option disabled">
            <input
              type="radio"
              name="votingType"
              value="ELECTION VOTE"
              disabled
            />
            <div>
              <div className="radio-label-main">Election Vote</div>
              <div className="radio-label-sub">Currently not supported — coming in a future release</div>
            </div>
          </label>
        </div>
        <div className="action-buttons">
          <button type="button" className="btn-cancel" onClick={() => setSelectedType('RESOLUTION VOTE')}>
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
