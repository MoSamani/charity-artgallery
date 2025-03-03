import React from 'react'
import { useNavigate } from 'react-router-dom'

function ViewArtwork() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>ViewArtwork</h2>
      <button
        type="button"
        onClick={() => {
          navigate(-1)
        }}
        className="member-btn"
      >
        {'Back'}
      </button>
    </div>
  )
}

export default ViewArtwork
