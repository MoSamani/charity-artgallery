import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar.jsx'
import PaintingCard from '../../components/PaintingCard'
import Countdown from '../../components/Countdown.jsx'
import Footer from '../../components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { getAllArtworks } from '../../features/artwork/artworkSlice.jsx'
import { getUser, updateUser } from '../../features/user/userSlice.jsx'
import { useNavigate } from 'react-router-dom'
import { setArtwork } from '../../features/artwork/artworkSlice.jsx'
import { gettotalDonates } from '../../features/offer/offerSlice.jsx'
import StepBar from '../../components/StepBar.jsx'
import Filter from '../../components/Filter.jsx'

import './Home.css'

function Home() {
  const { artworks } = useSelector((store) => store.artwork)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.user)
  const { totalDonates } = useSelector((store) => store.offer)
  console.log('totalDonates', totalDonates)
  // console.log('Artworks: ', artworks)

  const [favorites, setFavorites] = useState(user?.favorites || [])

  useEffect(() => {
    dispatch(getAllArtworks({}))
    dispatch(gettotalDonates({}))
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

    // console.log('favorites: ', favorites)
    // console.log('updatedFavorites: ', updatedFavorites)
    dispatch(
      updateUser({
        ...user,
        favorites: updatedFavorites,
      })
    )
  }

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedMedium, setSelectedMedium] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const sizes = [
    ...new Set(artworks?.map((artwork) => artwork.size.toLowerCase().trim())),
  ]

  const mediums = [
    ...new Set(artworks?.map((artwork) => artwork.medium.toLowerCase())),
  ]

  const filteredPaintingsList = artworks?.length
    ? artworks.filter((artwork) => {
        const sizeMatch = selectedSize
          ? artwork.size
              .toLowerCase()
              .includes(selectedSize.toLowerCase().trim())
          : true

        const mediumMatch = selectedMedium
          ? artwork.medium.toLowerCase().trim() ===
            selectedMedium.toLowerCase().trim()
          : true

        const priceMatch =
          (minPrice ? artwork.highestOffer >= minPrice : true) &&
          (maxPrice ? artwork.highestOffer <= maxPrice : true)

        return sizeMatch && mediumMatch && priceMatch
      })
    : []

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
      >
        <div className="countdown-stepbar">
          <Countdown />
          <StepBar amount={totalDonates} />
        </div>
      </div>

      <div>
        <Filter
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sizes={sizes}
          selectedMedium={selectedMedium}
          setSelectedMedium={setSelectedMedium}
          mediums={mediums}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
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
        {artworks.length === 0 ? (
          <p>Loading artworks...</p>
        ) : filteredPaintingsList.length > 0 ? (
          filteredPaintingsList.map((artwork) => (
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

// import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../../components/Navbar.jsx'
// import PaintingCard from '../../components/PaintingCard'
// import Filter from '../../components/Filter.jsx'
// import Countdown from '../../components/Countdown.jsx'
// import Footer from '../../components/Footer'
// import { getAllArtworks } from '../../features/artwork/artworkSlice.jsx'
// import { getUser } from '../../features/user/userSlice.jsx'
// import './Home.css'

// function Home() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const { artworks } = useSelector((store) => store.artwork)
//   const { user } = useSelector((store) => store.user)

//   useEffect(() => {
//     dispatch(getAllArtworks({}))

//     if (user) {
//       dispatch(getUser({ email: user.email }))
//     }
//   }, [])

//   const [selectedSize, setSelectedSize] = useState('')
//   const [selectedMedium, setSelectedMedium] = useState('')
//   const [minPrice, setMinPrice] = useState('')
//   const [maxPrice, setMaxPrice] = useState('')

//   const sizes = [
//     ...new Set(artworks?.map((artwork) => artwork.size.toLowerCase().trim())),
//   ]

//   const mediums = [
//     ...new Set(artworks?.map((artwork) => artwork.medium.toLowerCase())),
//   ]

//   const filteredPaintingsList = artworks?.length
//     ? artworks.filter((artwork) => {
//         const sizeMatch = selectedSize
//           ? artwork.size
//               .toLowerCase()
//               .includes(selectedSize.toLowerCase().trim())
//           : true

//         const mediumMatch = selectedMedium
//           ? artwork.medium.toLowerCase().trim() ===
//             selectedMedium.toLowerCase().trim()
//           : true

//         const priceMatch =
//           (minPrice ? artwork.mprise >= minPrice : true) &&
//           (maxPrice ? artwork.mprise <= maxPrice : true)

//         return sizeMatch && mediumMatch && priceMatch
//       })
//     : []

//   return (
//     <div>
//       <Navbar />
//       <div
//         className="main-content"
//         style={{
//           textAlign: 'center',
//           margin: '20px 0',
//           fontSize: '18px',
//           fontWeight: 'bold',
//         }}
//       >
//         <Countdown />
//       </div>

//       <Filter
//         selectedSize={selectedSize}
//         setSelectedSize={setSelectedSize}
//         sizes={sizes}
//         selectedMedium={selectedMedium}
//         setSelectedMedium={setSelectedMedium}
//         mediums={mediums}
//         minPrice={minPrice}
//         setMinPrice={setMinPrice}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//       />
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           gap: '20px',
//           marginTop: '20px',
//         }}
//       >
//         {artworks.length === 0 ? (
//           <p>Loading artworks...</p>
//         ) : filteredPaintingsList.length > 0 ? (
//           filteredPaintingsList.map((artwork) => (
//                       <PaintingCard
//               key={artwork._id}
//               painting={artwork}
//               onClick={() => {
//                 navigate('/ViewArtwork')
//                 dispatch(setArtwork(artwork))
//               }}
//               isFavorite={favorites.includes(artwork._id)}
//               onToggleFavorite={toggleFavorite}
//             />
//           ))
//         ) : (
//           <p>No paintings match the selected filters.</p>
//         )}
//       </div>

//       <Footer />
//     </div>
//   )
// }

// export default Home
