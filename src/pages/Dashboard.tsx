
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import CategoryTable, { CategoryData } from "@/components/CategoryTable";
import ConnectPlatform from "@/components/ConnectPlatform";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  CheckCircle2, 
  Calendar, 
  Trophy, 
  Brain, 
  Code,
  Cog,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const generateMockData = () => {
  // Question difficulty distribution
  const pieChartData = [
    { name: "Easy", value: 45, color: "#4CAF50" },
    { name: "Medium", value: 30, color: "#FF9800" },
    { name: "Hard", value: 15, color: "#F44336" },
  ];

  // Platform specific data
  const platformData = [
    { name: "LeetCode", easy: 25, medium: 15, hard: 8 },
    { name: "CodeChef", easy: 10, medium: 8, hard: 3 },
    { name: "GeeksForGeeks", easy: 5, medium: 4, hard: 2 },
    { name: "HackerRank", easy: 3, medium: 2, hard: 1 },
    { name: "CodeForces", easy: 2, medium: 1, hard: 1 },
  ];

  // Monthly progress
  const monthlyData = [
    { name: "Jan", easy: 5, medium: 2, hard: 0 },
    { name: "Feb", easy: 8, medium: 3, hard: 1 },
    { name: "Mar", easy: 12, medium: 5, hard: 2 },
    { name: "Apr", easy: 15, medium: 7, hard: 3 },
    { name: "May", easy: 20, medium: 10, hard: 5 },
    { name: "Jun", easy: 25, medium: 13, hard: 7 },
    { name: "Jul", easy: 30, medium: 15, hard: 8 },
  ];

  // Question categories
  const categories: CategoryData[] = [
    {
      category: "Arrays & Strings",
      total: 25,
      easy: 12,
      medium: 8,
      hard: 5,
      platforms: ["LeetCode", "CodeChef", "GeeksForGeeks"],
    },
    {
      category: "Dynamic Programming",
      total: 18,
      easy: 5,
      medium: 8,
      hard: 5,
      platforms: ["LeetCode", "CodeForces"],
    },
    {
      category: "Graph Theory",
      total: 15,
      easy: 4,
      medium: 7,
      hard: 4,
      platforms: ["LeetCode", "HackerRank"],
    },
    {
      category: "Tree Data Structures",
      total: 12,
      easy: 6,
      medium: 4,
      hard: 2,
      platforms: ["LeetCode", "GeeksForGeeks"],
    },
    {
      category: "Greedy Algorithms",
      total: 10,
      easy: 4,
      medium: 5,
      hard: 1,
      platforms: ["CodeChef", "HackerRank"],
    },
    {
      category: "Binary Search",
      total: 8,
      easy: 4,
      medium: 3,
      hard: 1,
      platforms: ["LeetCode", "CodeForces"],
    },
    {
      category: "Backtracking",
      total: 7,
      easy: 2,
      medium: 3,
      hard: 2,
      platforms: ["LeetCode", "GeeksForGeeks"],
    },
    {
      category: "Hash Table",
      total: 14,
      easy: 7,
      medium: 5,
      hard: 2,
      platforms: ["LeetCode", "HackerRank"],
    },
    {
      category: "Searching & Sorting",
      total: 16,
      easy: 8,
      medium: 6,
      hard: 2,
      platforms: ["CodeChef", "GeeksForGeeks"],
    },
    {
      category: "Database",
      total: 9,
      easy: 5,
      medium: 3,
      hard: 1,
      platforms: ["LeetCode", "HackerRank"],
    },
    {
      category: "Pattern-based",
      total: 11,
      easy: 6,
      medium: 4,
      hard: 1,
      platforms: ["GeeksForGeeks", "CodeChef"],
    },
    {
      category: "String Manipulation",
      total: 15,
      easy: 8,
      medium: 5,
      hard: 2,
      platforms: ["LeetCode", "CodeForces"],
    },
    {
      category: "Development",
      total: 6,
      easy: 3,
      medium: 2,
      hard: 1,
      platforms: ["HackerRank", "CodeChef"],
    },
  ];

  // Mock leaderboard data
  const leaderboardData = [
    { id: "1", rank: 1, name: "John Doe", score: 523, activeDays: 45 },
    { id: "2", rank: 2, name: "Jane Smith", score: 486, activeDays: 42 },
    { id: "3", rank: 3, name: "Alex Johnson", score: 451, activeDays: 38 },
    { id: "4", rank: 4, name: "Sam Wilson", score: 423, activeDays: 36 },
    { id: "5", rank: 5, name: "Ella Brown", score: 405, activeDays: 34 },
  ];

  // Platform-specific leaderboard
  const platformLeaderboard = [
    { id: "1", rank: 1, name: "John Doe", score: 124, platform: "LeetCode" },
    { id: "2", rank: 2, name: "Sarah Lee", score: 118, platform: "LeetCode" },
    { id: "3", rank: 3, name: "Alex Johnson", score: 105, platform: "LeetCode" },
    { id: "4", rank: 4, name: "Mark Davis", score: 98, platform: "LeetCode" },
    { id: "5", rank: 5, name: "Tina Chen", score: 85, platform: "LeetCode" },
  ];

  // Category leaderboard
  const categoryLeaderboard = [
    { id: "1", rank: 1, name: "John Doe", score: 87, category: "Arrays & Strings" },
    { id: "2", rank: 2, name: "Emma Roberts", score: 79, category: "Arrays & Strings" },
    { id: "3", rank: 3, name: "Michael Brown", score: 72, category: "Arrays & Strings" },
    { id: "4", rank: 4, name: "Sarah Wong", score: 68, category: "Arrays & Strings" },
    { id: "5", rank: 5, name: "David Lee", score: 65, category: "Arrays & Strings" },
  ];

  // Difficulty leaderboard
  const difficultyLeaderboard = [
    { id: "1", rank: 1, name: "John Doe", easy: 120, medium: 85, hard: 45 },
    { id: "2", rank: 2, name: "Sarah Lee", easy: 110, medium: 90, hard: 38 },
    { id: "3", rank: 3, name: "Alex Johnson", easy: 115, medium: 75, hard: 42 },
    { id: "4", rank: 4, name: "Mark Davis", easy: 105, medium: 82, hard: 36 },
    { id: "5", rank: 5, name: "Tina Chen", easy: 95, medium: 85, hard: 40 },
  ];

  return {
    pieChartData,
    platformData,
    monthlyData,
    categories,
    totalSolved: 90,
    activeDays: 45,
    streak: 12,
    leaderboardData,
    platformLeaderboard,
    categoryLeaderboard,
    difficultyLeaderboard
  };
};

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const [data, setData] = useState(generateMockData());
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Navigate to admin dashboard if user is admin
  useEffect(() => {
    if (userRole === "admin") {
      window.location.href = "/admin";
    }
  }, [userRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
            <p className="text-foreground/70">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Progress Portal</h1>
            <p className="text-foreground/70">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}! Here's your coding journey.
            </p>
          </div>
          
          <Link to="/edit-profile" className="mt-4 md:mt-0">
            <button className="portal-btn flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10">
              <Cog className="h-4 w-4" />
              Edit Profile
            </button>
          </Link>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full md:w-auto flex justify-between md:justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total Questions Solved" 
                value={data.totalSolved} 
                icon={<CheckCircle2 className="h-5 w-5 text-portal-blue" />}
                variant="blue"
                className="animate-fade-in"
                change={8}
              />
              <StatCard 
                title="Active Days" 
                value={data.activeDays} 
                icon={<Calendar className="h-5 w-5 text-portal-purple" />}
                variant="purple"
                className="animate-fade-in"
                change={5}
              />
              <StatCard 
                title="Current Streak" 
                value={`${data.streak} days`} 
                icon={<Trophy className="h-5 w-5 text-portal-orange" />}
                variant="orange"
                className="animate-fade-in"
                change={15}
              />
              <StatCard 
                title="Learning Efficiency" 
                value="92%" 
                icon={<Brain className="h-5 w-5 text-portal-pink" />}
                variant="pink"
                className="animate-fade-in"
                change={3}
              />
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <PieChart 
                data={data.pieChartData} 
                title="Questions by Difficulty" 
              />
              <BarChart 
                data={data.platformData} 
                title="Platform Breakdown"
                bars={[
                  { dataKey: "easy", color: "#4CAF50", name: "Easy" },
                  { dataKey: "medium", color: "#FF9800", name: "Medium" },
                  { dataKey: "hard", color: "#F44336", name: "Hard" },
                ]}
              />
            </div>
            
            {/* Monthly Progress */}
            <div className="mb-6">
              <LineChart 
                data={data.monthlyData} 
                title="Monthly Progress"
                lines={[
                  { dataKey: "easy", color: "#4CAF50", name: "Easy" },
                  { dataKey: "medium", color: "#FF9800", name: "Medium" },
                  { dataKey: "hard", color: "#F44336", name: "Hard" },
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            {/* Categories Table */}
            <div className="mb-6">
              <CategoryTable data={data.categories} />
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <LeaderboardTable 
                data={data.leaderboardData}
                title="Overall Leaderboard"
                category="Total Score"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LeaderboardTable 
                data={data.platformLeaderboard}
                title="Platform Leaderboard"
                category="LeetCode"
              />
              <LeaderboardTable 
                data={data.categoryLeaderboard}
                title="Category Leaderboard"
                category="Arrays & Strings"
              />
            </div>
            
            <div className="mt-6">
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
                      {data.difficultyLeaderboard.map((entry, index) => {
                        // Calculate total points: easy=1pt, medium=2pts, hard=3pts
                        const totalPoints = entry.easy * 1 + entry.medium * 2 + entry.hard * 3;
                        
                        return (
                          <tr 
                            key={entry.id} 
                            className="border-b border-border/20 hover:bg-foreground/5"
                          >
                            <td className="py-2 px-4 font-medium">{entry.rank}</td>
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
          </TabsContent>
          
          <TabsContent value="platforms" className="space-y-6">
            {/* Connect Platforms */}
            <ConnectPlatform />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
