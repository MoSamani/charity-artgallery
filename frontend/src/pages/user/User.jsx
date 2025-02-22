import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'
import Navbar from '../../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'

function User() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <Navbar />
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser())
          navigate('/login')
        }}
        className="member-btn"
      >
        {'Logout'}
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/EditUser')
        }}
        className="member-btn"
      >
        {'Edit user information'}
      </button>
    </div>
  )
}

export default User
