import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div>Home</div>
      <button onClick={() => navigate(`/`)}>Home</button>
      <button onClick={() => navigate(`/about`)}>About</button>
      <button onClick={() => navigate(`/shop`)}>Shop</button>
      <button onClick={() => navigate(`/cantact`)}>Contact</button>
      <button onClick={() => navigate(`/upload`)}>Upload</button>
      <button onClick={() => navigate(`/login`)}>Login</button>
    </>
  )
}

export default Home
