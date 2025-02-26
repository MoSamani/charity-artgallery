import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postArtworkThunk, getAllArtworksThunk } from './artworkthunk'

export const getAllArtworks = createAsyncThunk(
  'artwork/getAllArtworks',
  async (artwork, thunkAPI) => {
    return getAllArtworksThunk('artwork/all', artwork, thunkAPI)
  }
)

export const postArtwork = createAsyncThunk(
  'artwork/postArtwork',
  async (artwork, thunkAPI) => {
    return postArtworkThunk('artwork', artwork, thunkAPI)
  }
)

const initialState = {
  isLoading: false,
  artwork: {},
  artworks: [],
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
      .addCase(getAllArtworks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllArtworks.fulfilled, (state, { payload }) => {
        const { artworks } = payload
        state.isLoading = false
        state.artworks = artworks
      })
      .addCase(getAllArtworks.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})

export default artworkSlice.reducer
