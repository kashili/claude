import React, { useState, useEffect } from 'react'

const ELIGIBLE_COUNTRIES = ['USA', 'Canada', 'UK', 'Netherlands', 'UAE', 'Australia']

export default function Summary({ sessionId, onSuccess }) {
  const [session, setSession] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetch(`/api/vote/session/${sessionId}`)
      .then(r => r.json())
      .then(data => { setSession(data); setFetching(false) })
      .catch(() => { setError('Failed to load session data.'); setFetching(false) })
  }, [sessionId])

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/vote/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess()
      } else {
        setError(data.message || 'Failed to submit')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <div className="screen-card">
        <div className="screen-card-header">
          <div className="screen-number-badge">6</div>
          <span className="screen-title">Summary</span>
        </div>
        <div className="screen-body" style={{ textAlign: 'center', padding: '40px' }}>
          <div className="processing-spinner" style={{ width: 40, height: 40 }} />
          <p style={{ color: '#666', fontFamily: 'Arial, sans-serif', marginTop: 12 }}>Loading summary...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">6</div>
        <span className="screen-title">Summary</span>
      </div>
      <div className="screen-body">
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', fontFamily: 'Arial, sans-serif' }}>
          Please review all details before final submission. This will trigger the vote initiation email.
        </p>
        {error && <div className="error-message">{error}</div>}

        {session && (
          <>
            <div className="summary-section">
              <div className="summary-section-title">Vote Reference</div>
              <table className="summary-table">
                <tbody>
                  <tr><td>Vote Number</td><td>{session.voteNumber || '—'}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="summary-section">
              <div className="summary-section-title">Resolution Meta-Data</div>
              <table className="summary-table">
                <tbody>
                  <tr><td>Title</td><td>{session.title || '—'}</td></tr>
                  <tr><td>Description</td><td>{session.description || '—'}</td></tr>
                  <tr><td>Deadline</td><td>{session.deadline || '—'}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="summary-section">
              <div className="summary-section-title">Voting Configuration</div>
              <table className="summary-table">
                <tbody>
                  <tr><td>Voting Type</td><td>{session.votingType || '—'}</td></tr>
                  <tr><td>Resolution Text</td><td style={{ whiteSpace: 'pre-wrap' }}>{session.resolutionText || '—'}</td></tr>
                  <tr><td>Attached Document</td><td>{session.pdfFileName || 'None'}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="summary-section">
              <div className="summary-section-title">Eligible Voting Countries</div>
              <table className="countries-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ELIGIBLE_COUNTRIES.map((country, i) => (
                    <tr key={country}>
                      <td>{i + 1}</td>
                      <td>{country}</td>
                      <td>
                        <span style={{
                          background: '#E6F4EA',
                          color: '#1E7A34',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontFamily: 'Arial, sans-serif',
                          fontWeight: 'bold'
                        }}>
                          Eligible
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="action-buttons">
          <button type="button" className="btn-cancel" onClick={() => window.location.reload()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Cancel
          </button>
          <button type="button" className="btn-submit" onClick={handleSubmit} disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}
