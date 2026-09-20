import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen! flex! flex-col! justify-between! bg-canvas!">
      <NavBar />
      <main className="flex-1!">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
