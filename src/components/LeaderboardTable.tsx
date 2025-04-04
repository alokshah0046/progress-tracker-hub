
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  profilePic?: string;
  score: number;
  platform?: string;
  questionsEasy?: number;
  questionsMedium?: number;
  questionsHard?: number;
  activeDays?: number;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  title: string;
  category: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ 
  data, 
  title,
  category
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
  
  const maxScore = Math.max(...data.map(entry => entry.score), 1);
  
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <Table>
        <TableCaption>Leaderboard rankings for {category}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">
                <div className="flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
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
                  <div>
                    <div className="font-medium">{entry.name}</div>
                    {entry.platform && (
                      <div className="text-xs text-foreground/70">{entry.platform}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col gap-1">
                  <div className="text-right font-mono">{entry.score}</div>
                  <Progress value={(entry.score / maxScore) * 100} className="h-1.5" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
