import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (loading) return <div>Loading...</div>;

  // console.log('user: ', user)
  // console.log('token: ', token)

  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
