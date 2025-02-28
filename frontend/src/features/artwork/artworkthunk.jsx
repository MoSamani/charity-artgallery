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

export const getAllArtworksThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    console.log(resp.data)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
