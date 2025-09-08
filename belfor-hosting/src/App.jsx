// App.jsx or main.jsx
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './contexts/ThemeContext'; 
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import AppRoutes from './route';
import MainLayout from './layouts/MainLayout';
import Loader from './components/common/Loader';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider> 
        <NotificationProvider>
          <BrowserRouter>
            <AuthProvider> {/* Wrap with AuthProvider */}
              <Suspense fallback={<MainLayout><Loader /></MainLayout>}>
                <AppRoutes />
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;