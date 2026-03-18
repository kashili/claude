import React, { useState, useRef } from 'react'

export default function Details({ sessionId, onSuccess }) {
  const [resolutionText, setResolutionText] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are accepted.')
        return
      }
      setPdfFile(file)
      setError('')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are accepted.')
        return
      }
      setPdfFile(file)
      setError('')
    }
  }

  const handleSubmit = async () => {
    setError('')
    if (!resolutionText.trim()) {
      setError('Resolution text is required.')
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('sessionId', sessionId)
      formData.append('resolutionText', resolutionText)
      if (pdfFile) {
        formData.append('pdfFile', pdfFile)
      }
      const res = await fetch('/api/vote/details', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess()
      } else {
        setError(data.message || 'Failed to save details')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setResolutionText('')
    setPdfFile(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <div className="screen-number-badge">5</div>
        <span className="screen-title">Resolution Details</span>
      </div>
      <div className="screen-body">
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', fontFamily: 'Arial, sans-serif' }}>
          Provide the full resolution text and optionally attach a supporting PDF document.
        </p>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label className="form-label">Resolution Text</label>
          <textarea
            className="form-textarea"
            value={resolutionText}
            onChange={e => setResolutionText(e.target.value)}
            placeholder="Enter the full text of the resolution..."
            rows={5}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Supporting Document (PDF)</label>
          <div
            className={`file-upload-area ${pdfFile ? 'has-file' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <div className="file-upload-icon">
              {pdfFile ? (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M6 3h16l8 8v22H6V3z" fill="#28A745" opacity="0.2"/>
                  <path d="M6 3h16l8 8v22H6V3z" stroke="#28A745" strokeWidth="2"/>
                  <path d="M22 3v8h8" stroke="#28A745" strokeWidth="2"/>
                  <path d="M10 18h16M10 23h10" stroke="#28A745" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M6 3h16l8 8v22H6V3z" fill="#003A5C" opacity="0.1"/>
                  <path d="M6 3h16l8 8v22H6V3z" stroke="#003A5C" strokeWidth="2"/>
                  <path d="M22 3v8h8" stroke="#003A5C" strokeWidth="2"/>
                  <path d="M18 14v10M13 19h10" stroke="#003A5C" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            {pdfFile ? (
              <>
                <div className="file-upload-text">File selected</div>
                <div className="file-name">{pdfFile.name} ({(pdfFile.size / 1024).toFixed(1)} KB)</div>
              </>
            ) : (
              <>
                <div className="file-upload-text">Click to upload or drag and drop a PDF file</div>
                <div className="file-upload-text" style={{ fontSize: '12px', marginTop: '4px' }}>Max size: 10 MB</div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
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
