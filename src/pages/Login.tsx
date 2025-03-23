
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Navbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Since we don't have a real authentication system yet, 
  // we'll simulate the login process
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate loading
    toast.loading(isSignUp ? "Creating your account..." : "Logging in...");
    
    // Simulate API call
    setTimeout(() => {
      toast.dismiss();
      
      if (isSignUp) {
        toast.success("Account created successfully!");
      } else {
        toast.success("Logged in successfully!");
      }
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1500);
  };
  
  const handleGoogleSignIn = () => {
    toast.loading("Connecting to Google...");
    
    // Simulate API call
    setTimeout(() => {
      toast.dismiss();
      toast.success("Logged in with Google!");
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          {isSignUp
            ? "Sign up to track your coding progress"
            : "Sign in to continue with Progress Portal"}
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full py-6 flex items-center justify-center gap-2 border border-border hover:bg-foreground/5"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="h-5 w-5" />
          <span>{isSignUp ? "Sign up" : "Sign in"} with Google</span>
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-foreground/70">or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="portal-input"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="portal-input"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <a
                  href="#"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="portal-input"
            />
          </div>
          
          <Button type="submit" className="w-full portal-btn-primary">
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>
      </div>
      
      <p className="text-center text-sm text-foreground/70">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Link
          to={isSignUp ? "/login" : "/signup"}
          className="text-primary hover:underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  
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
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-portal-blue/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-portal-purple/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative glass-card p-8 rounded-2xl w-full max-w-md">
              <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-portal-blue/20 to-portal-purple/20 backdrop-blur-sm p-8 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/fa05a9aa-e88c-42e4-8f14-0f88c27e60d4.png" 
                  alt="Progress Portal Logo" 
                  className="w-4/5 h-4/5 object-contain animate-float"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Track Your Coding Journey</h3>
              <p className="text-foreground/70">
                Visualize your progress across multiple coding platforms and celebrate your achievements.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
