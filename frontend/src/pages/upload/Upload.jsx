import React from 'react'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Textarea from '../../components/Textarea'
import FormRow from '../../components/FormRow'
import { postArtwork } from '../../features/artwork/artworkSlice'
import Footer from '../../components/Footer'

const initialState = {
  name: '',
  medium: '',
  size: '',
  description: '',
  mprise: 20,
  donate: false,
}

function Upload() {
  const [values, setValues] = useState(initialState)
  const [checked, setChecked] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const { user } = useSelector((store) => store.user)
  const { isLoading } = useSelector((store) => store.artwork)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, medium, size, description, mprise, donate } = values
    const email = user.email

    const formData = new FormData()
    formData.append('name', name)
    formData.append('medium', medium)
    formData.append('size', size)
    formData.append('description', description)
    formData.append('mprise', mprise)
    formData.append('donate', donate)
    formData.append('email', email)
    formData.append('image', file)
    console.log(file)

    dispatch(postArtwork(formData))
    setValues(initialState)

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
    console.log(values)
  }

  const handleChangeDonate = (e) => {
    setChecked(!checked)
    const name = e.target.name
    setValues({ ...values, [name]: !checked })
    console.log(values)
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
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
      <div className="main-content">
        <h1>Upload Artwork</h1>

        <form className="form" onSubmit={onSubmit}>
          {/* name field */}

          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="medium"
            value={values.medium}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="size"
            value={values.size}
            handleChange={handleChange}
          />

          <Textarea
            name="description"
            value={values.description}
            handleChange={handleChange}
          />

          <FormRow type="file" name="image" handleChange={handleChangeFile} />
          {preview && (
            <div>
              <p>File name: {file.name} </p>
              <p>Type : {file.type}</p>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginTop: '10px',
                }}
              />
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setPreview(null)
              setFile(null)
            }}
          >
            Remove Image
          </button>

          <FormRow
            type="text"
            name="mprise"
            value={values.mprise}
            handleChange={handleChange}
          />

          <FormRow
            type="checkbox"
            checked={checked}
            name="donate"
            value={values.donate}
            handleChange={handleChangeDonate}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'loading...' : 'submit'}
          </button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Upload
