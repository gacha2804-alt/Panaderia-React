// src/components/admin/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";

const AdminRoute = ({ children }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/" />;

  // tu backend usa "rol"
  if (user.rol !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
