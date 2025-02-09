import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'
import Navbar from '../../components/Navbar.jsx'
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  return (
    <div className="home-container">
      <Navbar />
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser())
        }}
        className="member-btn"
      >
        {'Logout'}
      </button>
    </div>
  )
}

export default Home
