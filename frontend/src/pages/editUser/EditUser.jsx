import React from 'react'
import FormRow from '../../components/FormRow'
import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../features/user/userSlice'
import DeleteButton from '../../components/DeleteButton'

// const initialState = {
//   firstname: '',
//   lastname: '',
//   email: '',
//   favorites: '',
//   token: '',
//   isMember: true,
// }

function EditUser() {
  const { user, isLoading } = useSelector((store) => store.user)
  const { artwork } = useSelector((store) => store.artwork)
  const [values, setValues] = useState(artwork)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email } = values
    dispatch(
      updateUser({
        firstname,
        lastname,
        email,
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
        <h3>{'Edit'}</h3>
        {/* name field */}
        <FormRow
          type="text"
          name="firstname"
          value={values.firstname}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="lastname"
          value={values.lastname}
          handleChange={handleChange}
        />
        {/* email field */}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
      </form>

      <h3>{'change password'}</h3>
      <button
        type="button"
        onClick={() => {
          navigate('/EditPassword')
        }}
      >
        {'change password'}
      </button>
      <br />
      <br />
      <DeleteButton />
      {/* <button
        type="button"
        onClick={() => {
          dispatch(removeUser({ email: user.email }))
        }}
        style={{ backgroundColor: 'red' }}
      >
        {'remove user'}
      </button> */}
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          navigate('/User')
        }}
      >
        {'back'}
      </button>
    </div>
  )
}

export default EditUser
