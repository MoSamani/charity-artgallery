import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
        const { artwork } = payload
        state.isLoading = false
        state.artwork = artwork
      })
      .addCase(postArtwork.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})

export default artworkSlice.reducer
