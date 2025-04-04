
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading, userRole, checkUserRole } = useAuth();
  const [isCheckingRole, setIsCheckingRole] = useState(requiredRole ? true : false);

  useEffect(() => {
    const verifyRole = async () => {
      if (user && requiredRole) {
        setIsCheckingRole(true);
        const currentRole = await checkUserRole();
        
        setIsCheckingRole(false);
        
        if (currentRole !== requiredRole) {
          toast.error("You don't have permission to access this page");
        }
      }
    };

    if (user && requiredRole) {
      verifyRole();
    }
  }, [user, requiredRole, checkUserRole]);

  if (loading || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
          <p className="text-foreground/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
