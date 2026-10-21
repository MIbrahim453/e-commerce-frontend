import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import Home from "./pages/Home/Home";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckOut";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ProfilePage from "./pages/Profile";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminPayments from "./pages/Admin/AdminPayments";
import AdminUsers from "./pages/Admin/AdminUsers";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/catalog" element={<ProductsPage />} />
        <Route path="/new" element={<ProductsPage />} />
        <Route path="/collections" element={<ProductsPage />} />
        <Route path="/collections/:collection" element={<ProductsPage />} />
        <Route path="/product" element={<ProductDetailPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminAddProduct />} />
          <Route
            path="products/edit/:slug/:id"
            element={<AdminEditProduct />}
          />
          <Route path="products/edit/:slug" element={<AdminEditProduct />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/new" element={<AdminCategories />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
