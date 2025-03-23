import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../../features/user/userSlice'
import FormRow from '../../components/FormRow'
import Navbar from '../../components/Navbar'
import './Login.css'
import Footer from '../../components/Footer'

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  favorites: '',
  token: '',
  isMember: true,
}

function Login() {
  const [values, setValues] = useState(initialState)
  const { user, isLoading } = useSelector((store) => store.user)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (!values.isMember && name === 'password')
      setError(
        value.length < 8 ? 'Password must be at least 8 characters long.' : ''
      )
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email, password, isMember } = values

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
      return
    }
    dispatch(registerUser({ firstname, lastname, email, password }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/User')
      }, 1000)
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <div class="main-content-login">
        <form className="form-login" onSubmit={onSubmit}>
          <h3>{values.isMember ? 'Login' : 'Register'}</h3>
          {/* name field */}
          {!values.isMember && (
            <>
              <FormRow
                type="text"
                name="firstname"
                value={values.firstname}
                handleChange={handleChange}
                className="test"
              />

              <FormRow
                type="text"
                name="lastname"
                value={values.lastname}
                handleChange={handleChange}
              />
            </>
          )}

          <div className="input">
            {/* email field */}
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
          </div>

          {/* password field */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            errorMessage={error}
          />

          <button class="button-login" type="submit" disabled={isLoading}>
            {isLoading ? 'loading...' : 'submit'}
          </button>

          <p class="p-NotAMemberYet">
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button
              type="button"
              class="button-register"
              onClick={toggleMember}
            >
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Login
