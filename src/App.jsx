import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen! flex! flex-col! justify-between! bg-canvas!">
        <NavBar />
        <main className="flex-1!">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App