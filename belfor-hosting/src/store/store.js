import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import domainReducer from './slices/domainSlice'
import invoiceReducer from './slices/invoiceSlice'
import adminReducer from './slices/adminSlice'
import analyticsReducer from './slices/analyticsSlice'
import securityReducer from './slices/securitySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    domains: domainReducer,
    invoices: invoiceReducer,
    admin: adminReducer,
    analytics: analyticsReducer,
    security: securityReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store  