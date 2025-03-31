
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/auth/AuthForm";
import AuthIllustration from "@/components/auth/AuthIllustration";

const Login = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side: Auth Form */}
          <div className="flex items-center justify-center">
            <AuthForm isSignUp={isSignUp} />
          </div>
          
          {/* Right Side: Illustration */}
          <AuthIllustration />
        </div>
      </main>
    </div>
  );
};

export default Login;
