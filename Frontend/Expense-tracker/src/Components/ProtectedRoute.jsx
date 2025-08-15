import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // If user is still null, it could mean loading or not logged in.
  // You can show a loading spinner or null while checking.
  if (user === null) {
    // You can return a loader here if you want
    return null; 
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the children (dashboard etc)
  return children;
};

export default ProtectedRoute;
