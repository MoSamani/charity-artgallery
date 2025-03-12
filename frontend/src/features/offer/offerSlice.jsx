import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getOfferdArtworkThunk } from './offerThunk'

export const getOfferdArtworks = createAsyncThunk(
  'artwork/getOfferdArtworks',
  async (artwork, thunkAPI) => {
    return getOfferdArtworkThunk('offer/userartworks', artwork, thunkAPI)
  }
)

const initialState = {
  isLoading: false,
  offers: [],
  offerdArtworks: [],
}

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOfferdArtworks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOfferdArtworks.fulfilled, (state, { payload }) => {
        const { artworks } = payload
        state.isLoading = false
        state.offerdArtworks = artworks
      })
      .addCase(getOfferdArtworks.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default offerSlice.reducer
