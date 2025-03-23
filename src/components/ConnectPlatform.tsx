
import React, { useState } from "react";
import {
  Github,
  Code2,
  BrainCircuit,
  Brackets,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PlatformProps {
  name: string;
  icon: React.ReactNode;
  isConnected?: boolean;
  username?: string;
}

const ConnectPlatform: React.FC = () => {
  const [platforms, setPlatforms] = useState<PlatformProps[]>([
    {
      name: "LeetCode",
      icon: <Code2 className="h-5 w-5" />,
      isConnected: true,
      username: "coder123",
    },
    {
      name: "GeeksForGeeks",
      icon: <BrainCircuit className="h-5 w-5" />,
      isConnected: false,
    },
    {
      name: "CodeChef",
      icon: <Brackets className="h-5 w-5" />,
      isConnected: false,
    },
    {
      name: "HackerRank",
      icon: <Code2 className="h-5 w-5" />,
      isConnected: false,
    },
    {
      name: "CodeForces",
      icon: <Code2 className="h-5 w-5" />,
      isConnected: false,
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      isConnected: true,
      username: "dev_ninja",
    },
  ]);

  const handleConnect = (platformName: string) => {
    toast.loading(`Connecting to ${platformName}...`);
    
    // Simulate API call
    setTimeout(() => {
      setPlatforms(platforms.map(platform => 
        platform.name === platformName 
          ? { ...platform, isConnected: true, username: "user_" + Math.floor(Math.random() * 1000) } 
          : platform
      ));
      
      toast.dismiss();
      toast.success(`Connected to ${platformName} successfully!`);
    }, 1500);
  };

  const handleDisconnect = (platformName: string) => {
    toast.loading(`Disconnecting from ${platformName}...`);
    
    // Simulate API call
    setTimeout(() => {
      setPlatforms(platforms.map(platform => 
        platform.name === platformName 
          ? { ...platform, isConnected: false, username: undefined } 
          : platform
      ));
      
      toast.dismiss();
      toast.success(`Disconnected from ${platformName}`);
    }, 1500);
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-medium mb-4">Connect Platforms</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {platforms.map((platform, index) => (
          <div 
            key={index} 
            className="border border-border/50 rounded-lg p-4 flex flex-col justify-between transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-foreground/5 text-foreground">
                {platform.icon}
              </div>
              <div>
                <h4 className="font-medium">{platform.name}</h4>
                {platform.isConnected && platform.username && (
                  <p className="text-xs text-foreground/70">{platform.username}</p>
                )}
              </div>
            </div>
            
            {platform.isConnected ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnect(platform.name)}
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Connected
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnect(platform.name)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectPlatform;
