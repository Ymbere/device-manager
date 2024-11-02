import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InitialPage from "./pages/initial";
import { DeviceProvider } from './context/DeviceContext';
import NinjaHeader from './components/ninjaHeader';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DeviceProvider>
        <NinjaHeader />
        <InitialPage />
      </DeviceProvider>
    </QueryClientProvider>
  );
}

export default App;
