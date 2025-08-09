import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getUserDomains as fetchUserDomains,
  registerDomain as registerNewDomain,
  transferDomain as transferExistingDomain,
  renewDomain as renewExistingDomain
} from '../../services/api/domains';

// Create async thunks
export const getUserDomains = createAsyncThunk(
  'domains/getUserDomains',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserDomains();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerDomain = createAsyncThunk(
  'domains/registerDomain',
  async (domainData, { rejectWithValue }) => {
    try {
      const response = await registerNewDomain(domainData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const transferDomain = createAsyncThunk(
  'domains/transferDomain',
  async (domainData, { rejectWithValue }) => {
    try {
      const response = await transferExistingDomain(domainData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const renewDomain = createAsyncThunk(
  'domains/renewDomain',
  async ({ domainId, years }, { rejectWithValue }) => {
    try {
      const response = await renewExistingDomain(domainId, years);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  domains: [],
  loading: false,
  error: null,
  operationSuccess: false
};

const domainSlice = createSlice({
  name: 'domains',
  initialState,
  reducers: {
    resetDomainState: () => initialState,
    clearOperationStatus: (state) => {
      state.operationSuccess = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get User Domains
      .addCase(getUserDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDomains.fulfilled, (state, action) => {
        state.domains = action.payload;
        state.loading = false;
      })
      .addCase(getUserDomains.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Register Domain
      .addCase(registerDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = false;
      })
      .addCase(registerDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
        state.loading = false;
        state.operationSuccess = true;
      })
      .addCase(registerDomain.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Transfer Domain
      .addCase(transferDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = false;
      })
      .addCase(transferDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
        state.loading = false;
        state.operationSuccess = true;
      })
      .addCase(transferDomain.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Renew Domain
      .addCase(renewDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = false;
      })
      .addCase(renewDomain.fulfilled, (state, action) => {
        const index = state.domains.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.domains[index] = action.payload;
        }
        state.loading = false;
        state.operationSuccess = true;
      })
      .addCase(renewDomain.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { resetDomainState, clearOperationStatus } = domainSlice.actions;
export default domainSlice.reducer;