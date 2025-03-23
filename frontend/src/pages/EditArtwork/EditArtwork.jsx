import React from 'react'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Textarea from '../../components/Textarea'
import FormRow from '../../components/FormRow'
import { updateArtwork } from '../../features/artwork/artworkSlice'
import DeleteArtworkButton from '../../components/DeleteArtworkButton'

function EditArtwork() {
  const { user } = useSelector((store) => store.user)
  const { artwork, isLoading } = useSelector((store) => store.artwork)
  const [values, setValues] = useState(artwork)

  const [checked, setChecked] = useState(artwork?.donate || false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(artwork?.image1_url || null)
  console.log('EditArtwork', artwork)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, medium, size, description, price, donate, _id } = values
    const email = user.email

    const formData = new FormData()
    formData.append('name', name)
    formData.append('medium', medium)
    formData.append('size', size)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('donate', donate)
    formData.append('email', email)
    formData.append('_id', _id)
    if (file) {
      formData.append('image', file)
    }

    dispatch(updateArtwork(formData))
    setTimeout(() => {
      navigate('/User')
    }, 2000)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
    console.log('handleChange', values)
  }

  const handleChangeDonate = (e) => {
    setChecked(!checked)
    setValues((prevValues) => ({
      ...prevValues,
      donate: !checked,
    }))
    console.log('handleChangeDonate', values)
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
    console.log(file)
  }

  //   useEffect(() => {
  //     if (!user) {
  //       setTimeout(() => {
  //         navigate('/Login')
  //       }, 1000)
  //     }
  //   }, [user])

  useEffect(() => {
    if (!artwork) {
      setTimeout(() => {
        navigate('/User')
      }, 1000)
    }
  }, [artwork])

  return (
    <div>
      <Navbar />
      <h1>Edit Artwork</h1>

      <div>
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
            labelText="Description"
          />

          <FormRow type="file" name="image" handleChange={handleChangeFile} />
          {preview && (
            <div>
              {file?.name ? <p>File name: {file?.name} </p> : ''}
              {file?.type ? <p>Type : {file?.type} </p> : ''}
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
          {/* <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setPreview(null)
              setFile(null)
            }}
          >
            Remove Image
          </button> */}

          <FormRow
            type="text"
            name="price"
            value={values.price}
            handleChange={handleChange}
          />

          <FormRow
            type="checkbox"
            checked={checked}
            name="donate"
            value={values.donate}
            handleChange={handleChangeDonate}
          />

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'loading...' : 'submit'}
          </button>
        </form>
      </div>

      <DeleteArtworkButton artworkID={artwork?._id} />

      <button
        type="button"
        onClick={() => {
          navigate(-1)
        }}
        className="member-btn"
      >
        {'Back'}
      </button>
    </div>
  )
}

export default EditArtwork
