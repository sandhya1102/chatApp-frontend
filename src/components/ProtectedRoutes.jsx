import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { Authenticated } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Authenticated) navigate("/login");
  }, []);

  return children;
};

export default ProtectedRoutes;
