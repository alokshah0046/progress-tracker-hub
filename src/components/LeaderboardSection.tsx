
import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  easy?: number;
  medium?: number;
  hard?: number;
  score?: number;
  activeDays?: number;
  category?: string;
  platform?: string;
  profilePic?: string;
}

interface LeaderboardSectionProps {
  difficultyLeaderboard: LeaderboardEntry[];
  platformLeaderboard: LeaderboardEntry[];
  categoryLeaderboard: LeaderboardEntry[];
  leaderboardData: LeaderboardEntry[];
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  difficultyLeaderboard,
  platformLeaderboard,
  categoryLeaderboard,
  leaderboardData
}) => {
  // Returns an appropriate icon based on rank
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-foreground/70">{rank}</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Overall Leaderboard */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Overall Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase">
                <tr className="border-b border-border/40">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Profile</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Active Days</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr 
                    key={entry.id} 
                    className="border-b border-border/20 hover:bg-foreground/5"
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="py-2 px-4">{entry.name}</td>
                    <td className="py-2 px-4">
                      {entry.profilePic ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={entry.profilePic} 
                            alt={entry.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                          {entry.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4">{entry.score}</td>
                    <td className="py-2 px-4">{entry.activeDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Leaderboard */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Platform Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase">
                <tr className="border-b border-border/40">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Platform</th>
                </tr>
              </thead>
              <tbody>
                {platformLeaderboard.map((entry) => (
                  <tr 
                    key={entry.id} 
                    className="border-b border-border/20 hover:bg-foreground/5"
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="py-2 px-4">{entry.name}</td>
                    <td className="py-2 px-4">{entry.score}</td>
                    <td className="py-2 px-4">{entry.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Category Leaderboard */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Category Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase">
                <tr className="border-b border-border/40">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Category</th>
                </tr>
              </thead>
              <tbody>
                {categoryLeaderboard.map((entry) => (
                  <tr 
                    key={entry.id} 
                    className="border-b border-border/20 hover:bg-foreground/5"
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="py-2 px-4">{entry.name}</td>
                    <td className="py-2 px-4">{entry.score}</td>
                    <td className="py-2 px-4">{entry.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Difficulty Challenge Leaderboard */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-medium mb-4">Difficulty Challenge</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs uppercase">
              <tr className="border-b border-border/40">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Easy</th>
                <th className="py-3 px-4">Medium</th>
                <th className="py-3 px-4">Hard</th>
                <th className="py-3 px-4">Total Points</th>
              </tr>
            </thead>
            <tbody>
              {difficultyLeaderboard.map((entry) => {
                // Calculate total points: easy=1pt, medium=2pts, hard=3pts
                const totalPoints = (entry.easy || 0) * 1 + (entry.medium || 0) * 2 + (entry.hard || 0) * 3;
                
                return (
                  <tr 
                    key={entry.id} 
                    className="border-b border-border/20 hover:bg-foreground/5"
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="py-2 px-4">{entry.name}</td>
                    <td className="py-2 px-4">{entry.easy}</td>
                    <td className="py-2 px-4">{entry.medium}</td>
                    <td className="py-2 px-4">{entry.hard}</td>
                    <td className="py-2 px-4 font-bold">{totalPoints}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
