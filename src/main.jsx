import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './common/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // 5 minutes
      // cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const client_id = "887087555913-8h2b7v4ik4v5t3016qkm9ljpk6lc9rt2.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Router> */}
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={client_id}>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </QueryClientProvider>
    {/* </Router> */}
  </StrictMode>,
)
