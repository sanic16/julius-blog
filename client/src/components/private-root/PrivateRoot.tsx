import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";

const PrivateRoot = () => {
  const { auth } = useSelector((state: {auth: AuthState}) => state.auth)

  return auth ? <Layout /> : <Navigate to={'/login?redirect=/'} />
}

export default PrivateRoot