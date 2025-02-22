import React from 'react'
import FormRow from '../../components/FormRow'
import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser, logoutUser } from '../../features/user/userSlice'

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
  const [values, setValues] = useState(user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate('/User')
      }, 1000)
    }
  }, [user])

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
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser())
          navigate('/User')
        }}
      >
        {'back'}
      </button>
    </div>
  )
}

export default EditUser
