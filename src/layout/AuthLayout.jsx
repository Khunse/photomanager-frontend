import { useAuthContext } from '@/context/AuthContext';
import { useAuthGuard } from '@/External/Api';
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router';

export default function AuthLayout() {
// useAuthGuard();
    const { isAuthenticated } = useAuthContext();

  return (
    <>
        {
            isAuthenticated ?
            <Navigate to="/" /> :
            <section>
                <Outlet />
            </section>
        }
    </>
  )
}
