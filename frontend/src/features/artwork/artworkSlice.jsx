import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  postArtworkThunk,
  getAllArtworksThunk,
  getUsersArtworksThunk,
  updateArtworkThunk,
  removeArtworkThunk,
} from './artworkthunk'

export const getAllArtworks = createAsyncThunk(
  'artwork/getAllArtworks',
  async (artwork, thunkAPI) => {
    return getAllArtworksThunk('artwork/all', artwork, thunkAPI)
  }
)

export const getUsersArtworks = createAsyncThunk(
  'artwork/getUsersArtworks',
  async (artwork, thunkAPI) => {
    return getUsersArtworksThunk('artwork/user', artwork, thunkAPI)
  }
)

export const postArtwork = createAsyncThunk(
  'artwork/postArtwork',
  async (artwork, thunkAPI) => {
    return postArtworkThunk('artwork', artwork, thunkAPI)
  }
)

export const updateArtwork = createAsyncThunk(
  'artwork/updateArtwork',
  async (artwork, thunkAPI) => {
    return updateArtworkThunk('artwork', artwork, thunkAPI)
  }
)

export const removeArtwork = createAsyncThunk(
  'artwork/removeArtwork',
  async (artwork, thunkAPI) => {
    return removeArtworkThunk('artwork', artwork, thunkAPI)
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
  reducers: {
    setArtwork: (state, action) => {
      state.artwork = action.payload
    },
  },
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
      .addCase(postArtwork.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateArtwork.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateArtwork.fulfilled, (state, { payload }) => {
        const { artwork } = payload
        state.isLoading = false
        state.artwork = artwork
      })
      .addCase(updateArtwork.rejected, (state) => {
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
      .addCase(removeArtwork.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeArtwork.fulfilled, (state, { payload }) => {
        const { artworks } = payload
        state.isLoading = false
        state.usersArtworks = artworks
      })
      .addCase(removeArtwork.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setArtwork } = artworkSlice.actions

export default artworkSlice.reducer
