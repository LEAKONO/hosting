import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getInvoices as fetchInvoices,
  makePayment as processPayment 
} from '../../services/api/billing';

// Create async thunks
export const getInvoices = createAsyncThunk(
  'invoices/getInvoices',
  async (status = 'all', { rejectWithValue }) => {
    try {
      const response = await fetchInvoices(status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const makePayment = createAsyncThunk(
  'invoices/makePayment',
  async ({ invoiceId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await processPayment(invoiceId, paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  invoices: [],
  loading: false,
  error: null,
  paymentProcessing: false
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    resetInvoiceState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Get Invoices
      .addCase(getInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.loading = false;
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Make Payment
      .addCase(makePayment.pending, (state) => {
        state.paymentProcessing = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
        state.paymentProcessing = false;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.error = action.payload;
        state.paymentProcessing = false;
      });
  }
});

export const { resetInvoiceState } = invoiceSlice.actions;
export default invoiceSlice.reducer;