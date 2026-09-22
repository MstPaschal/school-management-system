import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/portal" replace />;
  }

  // Logged in but not authorized for this route
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    // Send each role back to its correct dashboard
    if (user.role === "student") {
      return <Navigate to="/student-portal" replace />;
    }

    if (user.role === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    }

    if (
      user.role === "admin" ||
      user.role === "superadmin"
    ) {
      return <Navigate to="/dashboard" replace />;
    }

    // Unknown role
    return <Navigate to="/portal" replace />;
  }

  return children;
}

export default ProtectedRoute;