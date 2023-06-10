import { Navigate, useLocation } from "react-router";
import useAdmin from "../../hooks/useAdmin";
import Spinner from "./Spiner";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Spinner></Spinner>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
