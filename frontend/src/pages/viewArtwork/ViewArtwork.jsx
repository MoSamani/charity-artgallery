import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { postOffer } from '../../features/offer/offerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../../components/Navbar.jsx'
import './ViewArtwork.css'

function ViewArtwork() {
  const navigate = useNavigate()
  const { artwork } = useSelector((store) => store.artwork)
  const [values, setValues] = useState({ offer: '' }) // Initialisiert mit leerem Wert

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value })) // State richtig updaten
    console.log(name, value)
  }

  const handleSubmit = () => {
    if (
      values.offer &&
      parseFloat(values.offer) > 20 &&
      parseFloat(values.offer) > artwork?.highestOffer
    ) {
      dispatch(postOffer({ artworkID: artwork._id, price: values.offer }))
      setValues({ offer: '' })
      navigate('/')
    } else {
      alert('Please enter a valid offer.')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="artwork-container">
        <div className="artwork-image">
          <img src={artwork.image1_url} alt="Artwork Image" />
        </div>
        <div className="artwork-info">
          <h2>{artwork.name}</h2>
          <p>
            <strong>Medium:</strong> {artwork.medium}
          </p>
          <p>
            <strong>Size:</strong> {artwork.size}
          </p>
          <p>
            <strong>Minimum Price:</strong> {artwork.price},00€
          </p>
          <p>
            <strong>Donate:</strong> {artwork.donate ? 'True' : 'False'}
          </p>
          <p>
            <strong>Highest Offer:</strong>{' '}
            {artwork.highestOffer ? artwork.highestOffer : 'No offer yet'}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {artwork.description
              ? artwork.description
              : 'No description provided'}
          </p>

          {/* Offer Input Section */}
          <div className="offer-section">
            <label htmlFor="newOffer">Your Offer (€):</label>
            <input
              type="number"
              name="offer"
              id="newOffer"
              placeholder="_,_"
              value={values.offer}
              onChange={handleChange} // Hier korrekt gesetzt
            />
            <button
              type="submit-button"
              onClick={handleSubmit}
              style={{ marginTop: '1rem' }}
            >
              Submit Offer
            </button>
          </div>
        </div>
      </div>

      <button
        id="offer"
        type="button"
        name="offer"
        onClick={() => navigate(-1)}
        className="button-back"
      >
        Back
      </button>
    </div>
  )
}

export default ViewArtwork
