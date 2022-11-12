import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import SideNav from './sidenav'

export default function Layout() {
    return (
        <div>
            <Navbar />
            <SideNav />
            <main className='ms-2' style={{ marginTop: '58px' }}>
                <div className="container pt-4">
                    <Outlet />
                </div>
            </main>
        </div >
    )
}
