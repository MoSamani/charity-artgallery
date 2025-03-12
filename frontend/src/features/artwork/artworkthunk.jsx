import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'

export const postArtworkThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, artwork)
    toast.success(`Your artwork is saved`)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Save failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateArtworkThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, artwork)
    toast.success(`Your artwork is updated`)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Update failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const removeArtworkThunk = async (url, artwork, thunkAPI) => {
  console.log('removeArtworkThunk: ', artwork)
  try {
    const resp = await customFetch.delete(url, { data: artwork })
    toast.success(`Your artwork is removed`)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Remove failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getAllArtworksThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getUsersArtworksThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getUsersFavoriteArtworksThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
