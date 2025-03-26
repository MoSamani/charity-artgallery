import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'

export const postOfferThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, artwork)
    toast.success('Offer posted!')
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getOfferdArtworkThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    // const errorMsg = error.response?.data?.msg || 'Fetch failed'
    // toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getTotalDonatesThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getUserSumOffersThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const removeOfferThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url, { data: artwork })
    toast.success('Offer removed!')
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getWinnersThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    console.log('resp.data', resp.data)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
