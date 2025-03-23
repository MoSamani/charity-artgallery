import React from 'react'
import { Link } from 'react-router-dom'
// import { getUserFromLocalStorage } from '../utils/localstorage'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import menuIcon from '../assets/hambergur-menu.svg'
import closeIcon from '../assets/kreuz.svg'
import title from '../assets/Title_v2.svg'

import './Navbar.css'

function Navbar() {
  const { user } = useSelector((store) => store.user)
  const [isOpen, setIsOpen] = useState(false)
  // const user = getUserFromLocalStorage()
  return (
    <div>
      <div className="navbar">
        <div className="left-part">
          <Link className="link" to={`/`}>
            Home
          </Link>
          <Link className="link" to={`/about`}>
            About
          </Link>
        </div>
        
        <a href="http://localhost:3000" src="/title_v2.svg"><img src="/title_v2.svg" alt="Logo" className="logo"/></a>
        <div className="right-part">
          <Link className="link" to={`/upload`}>
            Upload
          </Link>
          <Link className="link" to={`/login`}>
            {user ? user.firstname : 'Login'}
          </Link>
        </div>
      </div>
      {/* <div className="navbar-mobile">
        
      </div> */}
      <div className="navbar-mobile">
        <div className="navbar-mobile-header">
          <Link className="logo" to={`/`}>
            <img src={title} alt="title-icon" />
          </Link>
          <img
            src={isOpen ? closeIcon : menuIcon}
            alt="menu-icon"
            className="menu-icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div className="mobile-menu">
            <Link className="link" to={`/`} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              className="link"
              to={`/about`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              className="link"
              to={`/upload`}
              onClick={() => setIsOpen(false)}
            >
              Upload
            </Link>
            <Link
              className="link"
              to={`/login`}
              onClick={() => setIsOpen(false)}
            >
              {user ? user.firstname : 'Login'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
