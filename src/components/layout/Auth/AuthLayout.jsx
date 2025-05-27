import { useAuthContext } from '@/common/context/AuthContext';
import { useAuthGuard } from '@/common/External/Api';
import { Toaster } from '@/components/ui/sonner';
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
            <>
            <section>
                <Outlet />
            </section>
                <Toaster />
            </>
        }
    </>
  )
}
