
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  transparent = false,
  isAuthenticated = false
}) => {
  const location = useLocation();
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline" className="gap-2">
                <UserCircle className="h-4 w-4" />
                Profile
              </Button>
            </Link>
          ) : location.pathname !== "/login" ? (
            <Link to="/login">
              <Button className="portal-btn-primary">Login</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
