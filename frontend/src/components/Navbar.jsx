import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
  const { user } = useSelector((store) => store.user)
  return (
    <div className="navbar cormorant-garamond-regular">
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
          {user ? user.firstname : 'Login'}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
