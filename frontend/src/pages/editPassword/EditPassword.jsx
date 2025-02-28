import React from 'react'
import FormRow from '../../components/FormRow'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function EditPassword() {
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [newpassword, setNewpassword] = useState('')

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeNewPassword = (e) => {
    setNewpassword(e.target.value)
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
          type="text"
          name="newpassword"
          value={newpassword}
          handleChange={handleChangeNewPassword}
        />
        {/* email field */}

        {(password === '') | (newpassword === '') ? (
          <p style={{ color: 'red' }}>Please give your password </p>
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
      >
        {'back'}
      </button>
    </div>
  )
}

export default EditPassword
