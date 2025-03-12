import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar.jsx'
import PaintingCard from '../../components/PaintingCard'
import Countdown from '../../components/Countdown.jsx'
import Footer from '../../components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { getAllArtworks } from '../../features/artwork/artworkSlice.jsx'
import { getUser, updateUser } from '../../features/user/userSlice.jsx'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const { artworks } = useSelector((store) => store.artwork)
  console.log('Artworks: ', artworks)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { user } = useSelector((store) => store.user)
  console.log(user)
  const [favorites, setFavorites] = useState(user?.favorites || [])

  useEffect(() => {
    dispatch(getAllArtworks({}))

    if (user) {
      dispatch(getUser({ email: user.email }))
    }
  }, [])

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
      <div>
        <Navbar />
      </div>
      <div
        style={{
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
        class="main-content"
      >
        <Countdown />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <PaintingCard
              key={artwork._id}
              painting={artwork}
              onClick={() => navigate('/ViewArtwork')}
              isFavorite={favorites.includes(artwork._id)}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p>No Artworks match the selected filters.</p>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
