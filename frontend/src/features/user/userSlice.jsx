import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localstorage'
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  updatePasswordThunk,
  removeUserThunk,
  clearStoreThunk,
  getUserThunk,
  getGewonneneUsersThunk,
} from './userThunk'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('user/auth/register', user, thunkAPI)
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('user/auth/login', user, thunkAPI)
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('user/auth/updateUser', user, thunkAPI)
  }
)
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (user, thunkAPI) => {
    return updatePasswordThunk('user/auth/updatePassword', user, thunkAPI)
  }
)
export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (user, thunkAPI) => {
    return removeUserThunk('user/auth/removeUser', user, thunkAPI)
  }
)

export const getUser = createAsyncThunk(
  'user/getSingleUser',
  async (user, thunkAPI) => {
    return getUserThunk('user/auth/getUser', user, thunkAPI)
  }
)

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Welcome There ${user.firstname}`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload || 'Registration failed')
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        removeUserFromLocalStorage()
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.firstname}`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload || 'Login failed')
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        removeUserFromLocalStorage()
        addUserToLocalStorage(user)
        // toast.success(`Account Updated`)
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload || 'Update failed')
      })

      .addCase(updatePassword.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        // const { user } = payload
        state.isLoading = false
        // state.user = user
        // addUserToLocalStorage(user)
        toast.success(`Password changed`)
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        // const { user } = payload
        state.isLoading = false
        state.user = null
        removeUserFromLocalStorage()
        toast.success(`Account is deleted!`)
      })
      .addCase(removeUser.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        removeUserFromLocalStorage()
        addUserToLocalStorage(user)
        //  toast.success(`Account Updated`)
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(clearStore.rejected, () => {})
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
