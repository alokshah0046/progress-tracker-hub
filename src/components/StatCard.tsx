
import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  change?: number;
  variant?: "default" | "blue" | "purple" | "orange" | "pink";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  variant = "default",
  className,
}) => {
  const variantStyles = {
    default: "",
    blue: "border-l-4 border-portal-blue",
    purple: "border-l-4 border-portal-purple",
    orange: "border-l-4 border-portal-orange",
    pink: "border-l-4 border-portal-pink",
  };

  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-lg",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground/70 mb-1">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
          
          {change !== undefined && (
            <p className={`text-xs mt-1 ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last week
            </p>
          )}
        </div>
        
        {icon && (
          <div className="p-2 rounded-full bg-foreground/5">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
