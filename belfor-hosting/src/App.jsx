import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './contexts/ThemeContext'; 
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './route';
import MainLayout from './layouts/MainLayout';
import Loader from './components/common/Loader';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider> 
        <NotificationProvider>
          <BrowserRouter>
            <Suspense fallback={<MainLayout><Loader /></MainLayout>}>
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;