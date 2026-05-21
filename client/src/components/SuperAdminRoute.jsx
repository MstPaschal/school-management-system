import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";


function SuperAdminRoute({
  children
}) {

  const { user } =
    useAuth();


  if (!user) {

    return <Navigate to="/" />;

  }


  if (
    user.role !== "superadmin"
  ) {

    return <Navigate to="/dashboard" />;

  }


  return children;

}

export default SuperAdminRoute;