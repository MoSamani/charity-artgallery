import React from 'react'
import FormRow from '../../components/FormRow'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import './EditPassword.css'

function EditPassword() {
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [newpassword, setNewpassword] = useState('')
  const [error, setError] = useState('')

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeNewPassword = (e) => {
    const value = e.target.value
    setNewpassword(value)
    setError(
      value.length < 8 ? 'Password must be at least 8 characters long.' : ''
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // const { firstname, lastname, email } = user ? user: {firstname:'',lastname:'',email:''}
    const { firstname, lastname, email } = user

    dispatch(
      updatePassword({
        firstname,
        lastname,
        email,
        password,
        newpassword,
      })
    )
    setPassword('')
    setNewpassword('')
  }

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate('/Login')
      }, 1000)
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <div class="main-content">
        <form className="form" onSubmit={onSubmit}>
          <h3>{'Change password'}</h3>
          {/* name field */}
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={handleChangePassword}
          />

          <FormRow
            type="password"
            name="new password"
            value={newpassword}
            handleChange={handleChangeNewPassword}
            errorMessage={error}
          />
          {/* email field */}

          {(password === '') | (newpassword === '') ? (
            <p style={{ color: 'red' }}>Please fill input fields </p>
          ) : (
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'loading...' : 'submit'}
            </button>
          )}
        </form>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
          className="button-back"
        >
          {'back'}
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default EditPassword
