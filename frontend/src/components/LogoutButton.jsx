import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSlice.jsx'
import {
  removeUsersArtworks,
  removeFavoriteArtworks,
} from '../features/artwork/artworkSlice.jsx'
import { removeOfferdArtworks } from '../features/offer/offerSlice.jsx'

function LogoutButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(logoutUser())
        dispatch(removeFavoriteArtworks())
        dispatch(removeUsersArtworks())
        dispatch(removeOfferdArtworks())
        navigate('/login')
      }}
      className="member-btn"
    >
      {'Logout'}
    </button>
  )
}

export default LogoutButton
