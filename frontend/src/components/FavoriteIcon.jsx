import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/user/userSlice'

function FavoriteIcon({ itemId, isFavorite, onToggle }) {
  return (
    <span
      onClick={() => onToggle(itemId)}
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
