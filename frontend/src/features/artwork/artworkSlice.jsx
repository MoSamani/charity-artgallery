import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { postArtworkThunk } from './artworkthunk'

export const postArtwork = createAsyncThunk(
  'artwork/postArtwork',
  async (artwork, thunkAPI) => {
    return postArtworkThunk('artwork', artwork, thunkAPI)
  }
)

const initialState = {
  isLoading: false,
  artwork: {},
}

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postArtwork.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postArtwork.fulfilled, (state, { payload }) => {
        console.log('success', payload)

        const { artwork } = payload
        state.isLoading = false
        state.artwork = artwork
        toast.success(`Your artwork is saved`)
      })
      .addCase(postArtwork.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload || 'Save failed')
      })
  },
})

export default artworkSlice.reducer
