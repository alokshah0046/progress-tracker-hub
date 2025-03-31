
import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getUserStats, createStats, CodingStats } from "@/services/codingStatsService";

interface PlatformProps {
  name: string;
  icon: React.ReactNode;
  isConnected: boolean;
  username?: string;
  id?: string;
}

const ConnectPlatform: React.FC = () => {
  const { user } = useAuth();
  const [platforms, setPlatforms] = useState<PlatformProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Define available platforms
  const availablePlatforms = [
    {
      name: "LeetCode",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "GeeksForGeeks",
      icon: <BrainCircuit className="h-5 w-5" />,
    },
    {
      name: "CodeChef",
      icon: <Brackets className="h-5 w-5" />,
    },
    {
      name: "HackerRank",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "CodeForces",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    const loadPlatforms = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Get user's connected platforms from database
        const userStats = await getUserStats(user.id);
        
        // Map user stats to platform objects
        const connectedPlatformsMap = new Map<string, PlatformProps>();
        
        // First, populate the map with all available platforms (with their icons)
        availablePlatforms.forEach(platform => {
          connectedPlatformsMap.set(platform.name, {
            ...platform,
            isConnected: false
          });
        });
        
        // Then update the connected ones
        userStats.forEach(stat => {
          const platform = connectedPlatformsMap.get(stat.platform);
          if (platform) {
            connectedPlatformsMap.set(stat.platform, {
              ...platform,
              id: stat.id,
              isConnected: true,
              username: `user_${Math.floor(Math.random() * 1000)}`, // In a real app, this would come from the stats
            });
          }
        });
        
        // Convert map back to array
        setPlatforms(Array.from(connectedPlatformsMap.values()));
      } catch (error) {
        console.error("Error loading platforms:", error);
        toast.error("Failed to load connected platforms");
      } finally {
        setLoading(false);
      }
    };
    
    loadPlatforms();
  }, [user]);

  const handleConnect = async (platformName: string) => {
    if (!user) {
      toast.error("You must be logged in to connect a platform");
      return;
    }
    
    toast.loading(`Connecting to ${platformName}...`);
    
    try {
      // Create a new stats record for this platform
      const newStats: CodingStats = {
        user_id: user.id,
        platform: platformName,
        total_questions: 0,
        easy_questions: 0,
        medium_questions: 0,
        hard_questions: 0,
        active_days: 0
      };
      
      const createdStat = await createStats(newStats);
      
      if (createdStat) {
        // Update local state
        setPlatforms(platforms.map(platform => 
          platform.name === platformName 
            ? { 
                ...platform, 
                isConnected: true, 
                id: createdStat.id,
                username: `user_${Math.floor(Math.random() * 1000)}` 
              } 
            : platform
        ));
        
        toast.dismiss();
        toast.success(`Connected to ${platformName} successfully!`);
      }
    } catch (error) {
      console.error("Error connecting platform:", error);
      toast.dismiss();
      toast.error(`Failed to connect to ${platformName}`);
    }
  };

  const handleDisconnect = async (platformName: string, statId?: string) => {
    if (!user || !statId) {
      toast.error("Cannot disconnect platform");
      return;
    }
    
    toast.loading(`Disconnecting from ${platformName}...`);
    
    try {
      // Delete the stats record
      const { error } = await supabase
        .from("coding_stats")
        .delete()
        .eq("id", statId);
      
      if (error) throw error;
      
      // Update local state
      setPlatforms(platforms.map(platform => 
        platform.name === platformName 
          ? { ...platform, isConnected: false, username: undefined, id: undefined } 
          : platform
      ));
      
      toast.dismiss();
      toast.success(`Disconnected from ${platformName}`);
    } catch (error) {
      console.error("Error disconnecting platform:", error);
      toast.dismiss();
      toast.error(`Failed to disconnect from ${platformName}`);
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-6 min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p>Loading platforms...</p>
        </div>
      </div>
    );
  }

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
                onClick={() => handleDisconnect(platform.name, platform.id)}
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
