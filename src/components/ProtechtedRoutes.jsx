import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const  Authenticated = useSelector((state) => state.user);

  if (!Authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
