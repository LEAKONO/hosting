import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const getHostingPlans = async () => {
  const response = await axios.get(`${API_URL}/hosting/plans`);
  return response.data.map(plan => ({
    ...plan,
    formattedPrice: `$${plan.price.toFixed(2)}`,
    formattedAnnualPrice: `$${(plan.price * 12 * 0.8).toFixed(2)}`, // 20% discount
  }));
};

export const createService = async (planId, billingCycle) => {
  const response = await axios.post(`${API_URL}/hosting/services`, {
    planId,
    billingCycle
  });
  return {
    ...response.data,
    formattedExpiry: new Date(response.data.expiresAt).toLocaleDateString()
  };
};