import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getSecurityAlerts,
  getLoginHistory,
  getAuditLogs
} from '../../services/api/security';

// Async Thunks
export const fetchSecurityAlerts = createAsyncThunk(
  'security/getSecurityAlerts',
  async (severity, { rejectWithValue }) => {
    try {
      return await getSecurityAlerts(severity);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLoginHistory = createAsyncThunk(
  'security/getLoginHistory',
  async (userId, { rejectWithValue }) => {
    try {
      return await getLoginHistory(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAuditLogs = createAsyncThunk(
  'security/getAuditLogs',
  async (page, { rejectWithValue }) => {
    try {
      return await getAuditLogs(page);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  alerts: [],
  loginHistory: [],
  auditLogs: [],
  loading: false,
  error: null
};

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    resetSecurityState: () => initialState,
    dismissAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecurityAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecurityAlerts.fulfilled, (state, action) => {
        state.alerts = action.payload;
        state.loading = false;
      })
      .addCase(fetchLoginHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        state.loginHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.auditLogs = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('security/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  }
});

export const { resetSecurityState, dismissAlert } = securitySlice.actions;
export default securitySlice.reducer;