import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  postArtworkThunk,
  getAllArtworksThunk,
  getUsersArtworksThunk,
} from './artworkthunk'

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

export const getUsersArtworks = createAsyncThunk(
  'artwork/getUsersArtworks',
  async (artwork, thunkAPI) => {
    return getUsersArtworksThunk('artwork/user', artwork, thunkAPI)
  }
)

const initialState = {
  isLoading: false,
  artwork: {},
  artworks: [],
  usersArtworks: [],
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
      .addCase(getAllArtworks.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getUsersArtworks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsersArtworks.fulfilled, (state, { payload }) => {
        const { artworks } = payload
        state.isLoading = false
        state.usersArtworks = artworks
      })
      .addCase(getUsersArtworks.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default artworkSlice.reducer
