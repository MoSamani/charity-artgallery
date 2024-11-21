import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:5000/api')
    console.log(response.data)
  }
  useEffect(() => {
    fetchAPI()
  }, [])
  return <div>App</div>
}

export default App
