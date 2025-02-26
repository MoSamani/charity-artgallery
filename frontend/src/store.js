import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import artworkSlice from './features/artwork/artworkSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    artwork: artworkSlice,
  },
})
