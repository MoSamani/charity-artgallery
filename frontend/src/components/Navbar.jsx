import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div className="left-part">
        <Link className="link" to={`/`}>
          Home
        </Link>
        <Link className="link" to={`/about`}>
          About
        </Link>
        <Link className="link" to={`/shop`}>
          Shop
        </Link>
        <Link className="link" to={`/cantact`}>
          Contact
        </Link>
      </div>
      <div className="right-part">
        <Link className="link" to={`/upload`}>
          Upload
        </Link>
        <Link className="link" to={`/login`}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default Navbar
