import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'

export const getOfferdArtworkThunk = async (url, artwork, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, artwork)
    return resp.data
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'Fetch failed'
    toast.error(errorMsg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
