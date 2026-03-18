import React, { useState } from 'react'

const DEFAULTS = {
  title: 'Fiscal Responsibility-2026',
  description: 'The IMF is advising countries to implement growth-friendly fiscal adjustments to reduce high public debt, which is expected to rise further',
  deadline: 'October 25th 2026'
}

export default function MetaData({ sessionId, onSuccess }) {
  const [title, setTitle] = useState(DEFAULTS.title)
  const [description, setDescription] = useState(DEFAULTS.description)
  const [deadline, setDeadline] = useState(DEFAULTS.deadline)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!title.trim() || !description.trim() || !deadline.trim()) {
      setError('All fields are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/vote/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, title, description, deadline })
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess()
      } else {
        setError(data.message || 'Failed to save metadata')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setTitle(DEFAULTS.title)
    setDescription(DEFAULTS.description)
    setDeadline(DEFAULTS.deadline)
    setError('')
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">3</div>
        <span className="screen-title">Meta-Data</span>
      </div>
      <div className="screen-body">
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', fontFamily: 'Arial, sans-serif' }}>
          Review and edit the resolution metadata. Default values are pre-populated.
        </p>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Resolution title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Resolution description"
            rows={4}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Voting Deadline</label>
          <input
            type="text"
            className="form-input"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            placeholder="e.g. October 25th 2026"
          />
        </div>
        <div className="action-buttons">
          <button type="button" className="btn-cancel" onClick={handleCancel}>
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
