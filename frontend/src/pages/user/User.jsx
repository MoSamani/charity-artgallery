import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'
import Navbar from '../../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import { getUsersArtworks } from '../../features/artwork/artworkSlice.jsx'
import { useSelector } from 'react-redux'
import PaintingCard from '../../components/PaintingCard'
import Footer from '../../components/Footer.jsx'
import { setArtwork } from '../../features/artwork/artworkSlice.jsx'
import { getUser, updateUser } from '../../features/user/userSlice.jsx'

function User() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let { user } = useSelector((store) => store.user)

  useEffect(() => {
    if (user) {
      dispatch(getUsersArtworks({}))
      console.log(user)
    }
  }, [])
  let { usersArtworks } = useSelector((store) => store.artwork)

  const [favorites, setFavorites] = useState(user?.favorites || [])

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites || [])
    }
  }, [user])

  const toggleFavorite = (itemId) => {
    const isFavorite = favorites.includes(itemId)
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId]

    setFavorites(updatedFavorites)

    console.log('favorites: ', favorites)
    console.log('updatedFavorites: ', updatedFavorites)
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {usersArtworks ? (
            usersArtworks.map((artwork) => (
              <PaintingCard
                key={artwork._id}
                painting={artwork}
                onClick={() => navigate('/ViewArtwork')}
                isFavorite={favorites.includes(artwork._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p>No paintings is uploaded!</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch(logoutUser())
            navigate('/login')
          }}
          className="member-btn"
        >
          {'Logout'}
        </button>
        <button
          type="button"
          onClick={() => {
            navigate('/EditUser')
          }}
          className="member-btn"
        >
          {'Edit user information'}
        </button>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default User
