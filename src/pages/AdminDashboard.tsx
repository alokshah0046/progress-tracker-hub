
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Database,
  Settings,
  BarChart4,
  FileText,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={!!user} />
      
      <main className="flex-1 pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-foreground/70">
            Manage users, data, and platform settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">User Management</h3>
              <p className="text-muted-foreground">
                Add, edit, delete users, assign roles, reset passwords.
                This section is currently under development.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">Data Control</h3>
              <p className="text-muted-foreground">
                Manage coding stats, sync/update platform data.
                This section is currently under development.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">Platform Settings</h3>
              <p className="text-muted-foreground">
                Configure integrations, notifications, leaderboards.
                This section is currently under development.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">Monitoring & Analytics</h3>
              <p className="text-muted-foreground">
                Track user activity, generate reports.
                This section is currently under development.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">Content Management</h3>
              <p className="text-muted-foreground">
                Post announcements, manage discussions.
                This section is currently under development.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">Security</h3>
              <p className="text-muted-foreground">
                Monitor activity, set permissions, handle backups.
                This section is currently under development.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
