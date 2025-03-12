import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import artworkSlice from './features/artwork/artworkSlice'
import offerSlice from './features/offer/offerSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    artwork: artworkSlice,
    offer: offerSlice,
  },
})
