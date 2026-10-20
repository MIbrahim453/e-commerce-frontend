import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spin, message } from "antd";
import { AuthContext } from "../../context/authContext";

export default function AdminProtectedRoute() {
  const { user, initialLoading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!initialLoading && user && user.role !== "admin") {
      message.error("Access denied: Admin privileges required.");
    }
  }, [user, initialLoading]);

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

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
