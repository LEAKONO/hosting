import { createContext, useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = 'info', options = {}) => {
    const id = Date.now()
    const notification = { id, message, type, ...options }
    
    setNotifications(prev => [...prev, notification])
    
    if (!options.persist) {
      setTimeout(() => {
        removeNotification(id)
      }, options.duration || 5000)
    }
    
    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const showToast = {
    info: (message, options) => toast.info(message, options),
    success: (message, options) => toast.success(message, options),
    warning: (message, options) => toast.warning(message, options),
    error: (message, options) => toast.error(message, options),
    dismiss: (id) => toast.dismiss(id)
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showToast
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}