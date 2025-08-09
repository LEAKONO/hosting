import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as loginAPI, logout as logoutAPI, getCurrentUser as getCurrentUserAPI } from '../../services/api/auth'

// ✅ Async Thunks
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await loginAPI(credentials)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutAPI()
    return null
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUserAPI()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// ✅ Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false
}

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.isAdmin = action.payload.role === 'admin'
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

      // 🔹 Logout
      .addCase(logout.fulfilled, () => initialState)

      // 🔹 Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.isAdmin = action.payload.role === 'admin'
        state.loading = false
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { resetAuthState } = authSlice.actions
export default authSlice.reducer
