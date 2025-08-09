import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getRevenueData,
  getUserGrowth,
  getServiceUsage 
} from '../../services/api/analytics';

// Async Thunks
export const fetchRevenueData = createAsyncThunk(
  'analytics/getRevenueData',
  async (range, { rejectWithValue }) => {
    try {
      return await getRevenueData(range);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserGrowth = createAsyncThunk(
  'analytics/getUserGrowth',
  async (range, { rejectWithValue }) => {
    try {
      return await getUserGrowth(range);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServiceUsage = createAsyncThunk(
  'analytics/getServiceUsage',
  async (range, { rejectWithValue }) => {
    try {
      return await getServiceUsage(range);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  revenue: null,
  userGrowth: null,
  serviceUsage: null,
  loading: false,
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    resetAnalyticsState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.revenue = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserGrowth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserGrowth.fulfilled, (state, action) => {
        state.userGrowth = action.payload;
        state.loading = false;
      })
      .addCase(fetchServiceUsage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceUsage.fulfilled, (state, action) => {
        state.serviceUsage = action.payload;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.startsWith('analytics/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  }
});

export const { resetAnalyticsState } = analyticsSlice.actions;
export default analyticsSlice.reducer;