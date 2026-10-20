import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { AuthContext } from "../../context/authContext";

export default function ProtectedRoute() {
  const { user, initialLoading } = useContext(AuthContext);
  const location = useLocation();

  if (initialLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
