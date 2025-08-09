import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getUsers as fetchUsers,
  suspendUser as suspendUserAPI,
  activateUser as activateUserAPI,
  getSystemStats
} from '../../services/api/admin';

// Async Thunks
export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      return await fetchUsers(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const suspendUser = createAsyncThunk(
  'admin/suspendUser',
  async (userId, { rejectWithValue }) => {
    try {
      await suspendUserAPI(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const activateUser = createAsyncThunk(
  'admin/activateUser',
  async (userId, { rejectWithValue }) => {
    try {
      await activateUserAPI(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSystemStats = createAsyncThunk(
  'admin/getSystemStats',
  async (_, { rejectWithValue }) => {
    try {
      return await getSystemStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  stats: null,
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload);
        if (user) user.status = 'suspended';
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload);
        if (user) user.status = 'active';
      })
      .addCase(fetchSystemStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  }
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;