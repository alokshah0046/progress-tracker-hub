
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  withText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  withText = true,
  size = "md",
}) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };
  
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <img
        src="/lovable-uploads/fa05a9aa-e88c-42e4-8f14-0f88c27e60d4.png"
        alt="Progress Portal Logo"
        className={`${sizes[size]} object-contain`}
      />
      {withText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizes[size]} gradient-text`}>
            PROGRESS
          </span>
          <span className={`uppercase font-light text-xs tracking-widest ${size === 'lg' ? 'text-sm' : ''}`}>
            PORTAL
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
