import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RouteGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/signin" />;
};

export default RouteGuard;
