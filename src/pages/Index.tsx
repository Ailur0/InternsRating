import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const Index = () => {
  // Redirect to dashboard if authenticated, otherwise to landing
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/" replace />;
};

export default Index;
