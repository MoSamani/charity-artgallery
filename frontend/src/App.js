import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Shop from './pages/shop/Shop'
import Contact from './pages/contact/Contact'
import Upload from './pages/upload/Upload'
import Login from './pages/login/Login'
import './App.css'

const App = () => {
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:5000/api/user')
    console.log(response.data)
  }
  useEffect(() => {
    fetchAPI()
  }, [])
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cantact" element={<Contact />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
