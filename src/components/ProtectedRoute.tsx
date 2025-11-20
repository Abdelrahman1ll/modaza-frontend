import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

type ProtectedRouteProps = {
  children: JSX.Element;
  roles: ("owner" | "admin")[];
};

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  if (!user || !roles.includes(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
