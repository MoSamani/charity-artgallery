import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tabs from 'react-bootstrap/Tabs'
import { logoutUser } from '../../features/user/userSlice'
import Navbar from '../../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import {
  getUsersArtworks,
  getUsersFavoriteArtworks,
  setArtwork,
  removeUsersArtworks,
  removeFavoriteArtworks,
} from '../../features/artwork/artworkSlice.jsx'

import {
  getOfferdArtworks,
  getUsersumOffers,
  removeOfferdArtworks,
  removeOffer,
} from '../../features/offer/offerSlice.jsx'
import { useSelector } from 'react-redux'
import PaintingCard from '../../components/PaintingCard'
import Footer from '../../components/Footer.jsx'
import { getUser, updateUser } from '../../features/user/userSlice.jsx'
import DeleteButton from '../../components/DeleteButton'
import FormRow from '../../components/FormRow'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../../bootstrap-styles/custom-bootstrap.scss' // Nur die benötigten Bootstrap-Styles
import './User.css'

function User() {
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
    const { firstname, lastname } = values
    dispatch(
      updateUser({
        firstname,
        lastname,
        email: user.email,
      })
    )
  }

  const [key, setKey] = useState('Activity')

  useEffect(() => {
    if (user) {
      dispatch(getUsersArtworks({}))
      dispatch(getUsersFavoriteArtworks({}))
      dispatch(getOfferdArtworks({}))
      dispatch(getUsersumOffers({}))
      dispatch(getUser({ email: user.email }))
    }
  }, [])

  let { usersArtworks, favoriteArtworks } = useSelector(
    (store) => store.artwork
  )
  let { offerdArtworks, userSumOffers } = useSelector((store) => store.offer)

  const [favorites, setFavorites] = useState(user?.favorites || [])

  const toggleFavorite = (itemId) => {
    const isFavorite = favorites.includes(itemId)
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId]

    setFavorites(updatedFavorites)

    dispatch(
      updateUser({
        ...user,
        favorites: updatedFavorites,
      })
    )
  }

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div>
          <div className="win-donate">
            <span>{userSumOffers.wonOffers} €</span>,{' '}
            <span>{userSumOffers.donatedOffers} €</span>
          </div>
          <div className="win-donate-lable">
            <span>Win</span> <span>Donate</span>
          </div>
          {/* Win in Total: {userSumOffers.wonOffers}, Donate in Total:{' '}
          {userSumOffers.donatedOffers} */}
        </div>

        <Tabs
  id="controlled-tab-example"
  activeKey={key}
  onSelect={(k) => setKey(k)}
  className="mb-3"
>
  <Tab eventKey="Activity" title="Activity">
    <Tabs
      id="activity-sub-tabs"
      defaultActiveKey="Uploads"
      className="mb-3 inner-tabs"
    >
      <Tab eventKey="Uploads" title="Uploads">
        <div className="painting-card-wrapper">
          {usersArtworks?.length > 0 ? (
            usersArtworks.map((artwork) => (
              <PaintingCard
                key={artwork._id}
                painting={artwork}
                onClick={() => {
                  navigate('/EditArtwork')
                  dispatch(setArtwork(artwork))
                }}
                isFavorite={favorites.includes(artwork._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p>No artworks uploaded yet.</p>
          )}
        </div>
      </Tab>

      <Tab eventKey="Offers" title="Offers">
        <div className="painting-card-wrapper">
          {offerdArtworks?.length > 0 ? (
            offerdArtworks.map((artwork) => (
              <div key={artwork._id} className="offer-wrapper">
                <PaintingCard
                  painting={artwork}
                  onClick={() => {
                    navigate('/ViewArtwork')
                    dispatch(setArtwork(artwork))
                  }}
                  isFavorite={favorites.includes(artwork._id)}
                  onToggleFavorite={toggleFavorite}
                />
                <button
                  className="remove-offer-btn"
                  onClick={() => {
                    dispatch(removeOffer({ artworkID: artwork._id }))
                    window.location.reload()
                  }}
                >
                  Remove Offer
                </button>
              </div>
            ))
          ) : (
            <p>No offers available.</p>
          )}
        </div>
      </Tab>

      <Tab eventKey="Favorites" title="Favorites">
        <div className="painting-card-wrapper">
          {favoriteArtworks?.length > 0 ? (
            favoriteArtworks.map((artwork) => (
              <PaintingCard
                key={artwork._id}
                painting={artwork}
                onClick={() => {
                  navigate('/ViewArtwork')
                  dispatch(setArtwork(artwork))
                }}
                isFavorite={favorites.includes(artwork._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p>No favorite artworks yet.</p>
          )}
        </div>
      </Tab>
    </Tabs>
  </Tab>

  <Tab eventKey="Profile" title="Profile">
    <div className="tab-pane-content">
      <form className="form" onSubmit={onSubmit}>
        <h3>Edit Profile</h3>
        <FormRow
          type="text"
          name="firstname"
          value={values?.firstname}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="lastname"
          value={values?.lastname}
          handleChange={handleChange}
        />npm setArtwork
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'loading...' : 'Submit'}
        </button>
      </form>

      <div className="profile-buttons">
        <h3>Account Settings</h3>
        <button type="button" onClick={() => navigate('/EditPassword')} className="button-changepassword" style={{color:'#fff'}}> 
          Change password
        </button>
        <DeleteButton />
        <button type="button" onClick={() => navigate('/User')} className="button-back2" style={{color:'#fff'}}>
          Back
        </button>
      </div>
    </div>
  </Tab>
</Tabs>
 
  

      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser())
          dispatch(removeFavoriteArtworks())
          dispatch(removeUsersArtworks())
          dispatch(removeOfferdArtworks())
          navigate('/login')
        }}
        className="member-btn"
      >
        {'Logout'}
      </button>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default User
