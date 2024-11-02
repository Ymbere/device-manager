import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InitialPage from './pages/initial';
import { DeviceProvider } from './context/DeviceContext';
import NinjaHeader from './components/ninjaHeader';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <DeviceProvider>
          <NinjaHeader />
          <InitialPage />
        </DeviceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
