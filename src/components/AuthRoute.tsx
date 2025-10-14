import { Navigate } from "react-router-dom";

export default function AuthRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: string;
}) {
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
