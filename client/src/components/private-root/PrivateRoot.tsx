import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoot = () => {
  const { user } = useSelector((state: {auth: AuthState}) => state.auth)

  return user ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoot