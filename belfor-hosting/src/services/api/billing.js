import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Get available payment methods
export const getPaymentMethods = async () => {
  const response = await axios.get(`${API_URL}/payment-methods`);
  return response.data;
};

// Make a payment
export const makePayment = async (invoiceId, paymentData) => {
  const response = await axios.post(`${API_URL}/payments/process`, {
    invoiceId,
    ...paymentData
  });
  return response.data;
};

// Get invoices
export const getInvoices = async (status = 'all') => {
  const response = await axios.get(`${API_URL}/invoices`, {
    params: { status }
  });
  return response.data;
};
