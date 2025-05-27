import React from 'react'
import { useAuthContext } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router';
import { RootLayout } from '@/components/layout/Root';

export default function ProtectedRoute() {

    const {CheckUserAuth} = useAuthContext();
    console.log('CheckUserAuth : ', );
  return (
    CheckUserAuth ?
     <RootLayout >
        <Outlet />
    </RootLayout> : 
     <Navigate to="/login" /> 
  )
}
