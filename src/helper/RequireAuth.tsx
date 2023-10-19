import { useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface IRequireAuthProps {
  children: any;
}

const RequireAuth = ({ children }: IRequireAuthProps) => {
  const token = Cookies.get("userToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/log-in"} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
