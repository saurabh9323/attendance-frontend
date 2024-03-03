/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import isTokenValid from "./isTokenValid";

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ path, element }) => {
  return isTokenValid() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export default ProtectedRoute;
