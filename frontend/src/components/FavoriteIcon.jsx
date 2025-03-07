import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/user/userSlice'

function FavoriteIcon({ itemId }) {
  const dispatch = useDispatch()
  let { user } = useSelector((store) => store.user)
  const [favorites, setFavorites] = useState(user?.favorites || [])

  // useEffect(() => {
  //   setFavorites(user?.favorites || [])
  // }, [user?.favorites])
  useEffect(() => {
    console.log('updatedFavorites')
  }, [favorites])

  const isFavorite = favorites.includes(itemId)

  const toggleFavorite = () => {
    let updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId]

    setFavorites(updatedFavorites)
    console.log('updatedFavorites: ', updatedFavorites)

    dispatch(
      updateUser({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        favorites: updatedFavorites,
      })
    )
  }
  console.log('favorites: ', favorites)
  return (
    <span
      onClick={toggleFavorite}
      style={{
        color: isFavorite ? 'red' : 'gray',
        cursor: 'pointer',
        fontSize: '35px',
      }}
    >
      ♥
    </span>
  )
}

export default FavoriteIcon
