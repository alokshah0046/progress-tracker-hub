
import React from "react";

const AuthIllustration: React.FC = () => {
  return (
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
  );
};

export default AuthIllustration;
