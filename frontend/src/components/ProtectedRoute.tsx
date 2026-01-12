import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  role: "employee" | "manager" | "admin";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />;
  }
  if (role && userRole !== role) {
  return <Navigate to="/login" />;
}

  return children;
};

export default ProtectedRoute;
