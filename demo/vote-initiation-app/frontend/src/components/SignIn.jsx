import React, { useState } from 'react'

export default function SignIn({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/vote/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess(data.sessionId)
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setUsername('')
    setPassword('')
    setError('')
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">1</div>
        <span className="screen-title">Sign In</span>
      </div>
      <div className="screen-body">
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', fontFamily: 'Arial, sans-serif' }}>
          Please enter your credentials to access the IMF Vote Initiation System.
        </p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="action-buttons">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {loading ? 'Signing In...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
