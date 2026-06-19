import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RequireAdmin({ children }) {
  const { user } = useAuth();

  if (!user?.role || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAdmin;
