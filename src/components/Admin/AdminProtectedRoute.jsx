import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  // Pure UI styling mode - renders admin routes directly
  return <Outlet />;
}
