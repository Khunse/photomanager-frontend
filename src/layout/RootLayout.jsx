import AppSideBar from '@/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <>
        <SidebarProvider>
            <AppSideBar />
            <main className='w-full h-full pt-5 pb-5 ps-10 pe-10 grid gap-5'>
                <SidebarTrigger />
                <Outlet />
            </main>
            <Toaster />
        </SidebarProvider>
    </>
  )
}
