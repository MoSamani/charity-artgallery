import React from 'react'
import { Link } from 'react-router-dom'
// import { getUserFromLocalStorage } from '../utils/localstorage'
import { useSelector } from 'react-redux'
import './Navbar.css';

function Navbar() {
  const { user } = useSelector((store) => store.user)
  // const user = getUserFromLocalStorage()
  return (
    <div className="navbar">
      <div className="left-part">
        <Link className="link" to={`/`}>
          Home
        </Link>
        <Link className="link" to={`/about`}>
          About
        </Link>
        {/* <Link className="link" to={`/shop`}>
          Shop
        </Link>
        <Link className="link" to={`/cantact`}>
          Contact
        </Link> */}
      </div>
      <img src="/Logo.svg" alt="Logo" className="logo" />
      <div className="right-part">
        <Link className="link" to={`/upload`}>
          Upload
        </Link>
        <Link className="link" to={`/login`}>
          {user ? user.firstname : 'Login'}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
