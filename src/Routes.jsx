import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'

import Home from './pages/Home/Home'
import ProductsPage from './pages/Products'
import ProductDetailPage from './pages/ProductDetail'
import CheckoutPage from './pages/Checkout'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import ProfilePage from './pages/Profile'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/catalog" element={<ProductsPage />} />
        <Route path="/product" element={<ProductDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
