import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getOfferdArtworkThunk,
  getUserSumOffersThunk,
  removeOfferThunk,
  postOfferThunk,
  getTotalDonatesThunk,
  getWinnersThunk,
} from './offerThunk'

export const postOffer = createAsyncThunk(
  'offer/postOffer',
  async (artwork, thunkAPI) => {
    return postOfferThunk('offer/', artwork, thunkAPI)
  }
)

export const getOfferdArtworks = createAsyncThunk(
  'offer/getOfferdArtworks',
  async (artwork, thunkAPI) => {
    return getOfferdArtworkThunk('offer/userartworks', artwork, thunkAPI)
  }
)

export const getUsersumOffers = createAsyncThunk(
  'offer/getUsersumOffers',
  async (artwork, thunkAPI) => {
    return getUserSumOffersThunk('offer/getoffers', artwork, thunkAPI)
  }
)

export const removeOffer = createAsyncThunk(
  'offer/removeOffer',
  async (artwork, thunkAPI) => {
    return removeOfferThunk('offer/deleteoffer', artwork, thunkAPI)
  }
)

export const getWinners = createAsyncThunk(
  'offer/getWinners',
  async (artwork, thunkAPI) => {
    return getWinnersThunk('offer/winners', artwork, thunkAPI)
  }
)

export const gettotalDonates = createAsyncThunk(
  'offer/totalDonate',
  async (artwork, thunkAPI) => {
    return getTotalDonatesThunk('public/donates', artwork, thunkAPI)
  }
)

const initialState = {
  isLoading: false,
  userSumOffers: {},
  offers: [],
  offerdArtworks: [],
  winners: [],
  totalDonates: {},
}

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    removeOfferdArtworks: (state, action) => {
      state.offerdArtworks = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postOffer.fulfilled, (state, { payload }) => {
        // const { offer } = payload
        state.isLoading = false
        // state.offerdArtworks = offer
      })
      .addCase(postOffer.rejected, (state) => {
        state.isLoading = false
      })
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
      .addCase(getUsersumOffers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsersumOffers.fulfilled, (state, { payload }) => {
        const { offers } = payload
        state.isLoading = false
        state.userSumOffers = offers
      })
      .addCase(getUsersumOffers.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(removeOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeOffer.fulfilled, (state, { payload }) => {
        // const { offers } = payload
        state.isLoading = false
      })
      .addCase(removeOffer.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(gettotalDonates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(gettotalDonates.fulfilled, (state, { payload }) => {
        const { totalMaxDonates } = payload
        state.totalDonates = totalMaxDonates
        state.isLoading = false
      })
      .addCase(gettotalDonates.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getWinners.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWinners.fulfilled, (state, { payload }) => {
        const { users } = payload
        state.winners = users
        state.isLoading = false
      })
      .addCase(getWinners.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { removeOfferdArtworks } = offerSlice.actions
export default offerSlice.reducer
