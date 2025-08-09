import axios from 'axios';

const API_BASE_URL = '/api'; // Change this if your backend URL is different

export const getInvoices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice ${invoiceId}:`, error);
    throw error;
  }
};

export const makePayment = async (invoiceId, paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/invoices/${invoiceId}/pay`, paymentData);
    return response.data;
  } catch (error) {
    console.error(`Error making payment for invoice ${invoiceId}:`, error);
    throw error;
  }
};

// ✅ Get all saved payment methods
export const getPaymentMethods = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payment-methods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

export const addPaymentMethod = async (methodData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payment-methods`, methodData);
    return response.data;
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};
