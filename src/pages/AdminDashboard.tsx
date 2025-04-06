
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
  UserPlus,
  Edit,
  Trash2,
  KeyRound,
  RefreshCw,
  Save,
  Bell,
  Trophy,
  Eye,
  Download,
  PencilLine,
  MessageCircle,
  Lock,
  Unlock,
  Server
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");

  // Mock user data for admin management
  const mockUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "user", lastActive: "2023-04-01" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", lastActive: "2023-04-02" },
    { id: "3", name: "Admin User", email: "admin@example.com", role: "admin", lastActive: "2023-04-03" },
    { id: "4", name: "Grace Wilson", email: "grace@example.com", role: "user", lastActive: "2023-04-01" },
    { id: "5", name: "Tom Richards", email: "tom@example.com", role: "user", lastActive: "2023-03-28" },
  ];

  // Mock handler functions
  const handleAddUser = () => toast.success("User creation feature will be implemented soon");
  const handleEditUser = (id: string) => toast.success(`Editing user ${id}`);
  const handleDeleteUser = (id: string) => toast.success(`Deleting user ${id}`);
  const handleResetPassword = (id: string) => toast.success(`Password reset for user ${id}`);
  const handleSaveSettings = () => toast.success("Settings saved successfully");
  const handleGenerateReport = () => toast.success("Report generated successfully");
  const handleBackup = () => toast.success("Backup created successfully");

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
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <Button onClick={handleAddUser} size="sm" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add User
                  </Button>
                </div>
                <CardDescription>
                  Add, edit, delete users, assign roles, reset passwords
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Last Active</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/20 hover:bg-foreground/5">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">{user.lastActive}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" onClick={() => handleEditUser(user.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleResetPassword(user.id)}>
                                <KeyRound className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Control</CardTitle>
                <CardDescription>Manage coding stats, sync/update platform data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md flex flex-col gap-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Sync Platform Data
                    </h3>
                    <p className="text-sm text-muted-foreground">Update user stats from coding platforms</p>
                    <Button className="mt-2">Sync Now</Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex flex-col gap-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Data Cleanup
                    </h3>
                    <p className="text-sm text-muted-foreground">Remove outdated or invalid data entries</p>
                    <Button className="mt-2">Run Cleanup</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-3">Data Import/Export</h3>
                  <div className="flex flex-col md:flex-row gap-3">
                    <Button variant="outline">Import Data</Button>
                    <Button variant="outline">Export Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure integrations, notifications, leaderboards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      API Integrations
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm mb-1">LeetCode API Key</label>
                        <Input type="password" value="••••••••••••••••" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm mb-1">CodeForces API Key</label>
                        <Input type="password" value="••••••••••••••••" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notification Settings
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <label>Email Notifications</label>
                        <input type="checkbox" checked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label>Push Notifications</label>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Leaderboard Settings
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <label>Public Leaderboards</label>
                        <input type="checkbox" checked className="toggle" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm mb-1">Refresh Interval (hours)</label>
                        <Input type="number" value="24" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring & Analytics</CardTitle>
                <CardDescription>Track user activity, generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      User Activity
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Active Users (today)</span>
                        <span className="font-medium">27</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Registrations (week)</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Coding Problems Solved</span>
                        <span className="font-medium">1,342</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Report Generation
                    </h3>
                    <div className="space-y-3">
                      <Button onClick={handleGenerateReport} className="w-full">User Activity Report</Button>
                      <Button onClick={handleGenerateReport} className="w-full">Platform Usage Report</Button>
                      <Button onClick={handleGenerateReport} className="w-full">Problem Completion Report</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Post announcements, manage discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <PencilLine className="h-4 w-4" />
                      Announcements
                    </h3>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <label className="text-sm mb-1">Title</label>
                        <Input placeholder="Announcement Title" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm mb-1">Content</label>
                        <textarea 
                          className="w-full min-h-[100px] p-2 border rounded-md" 
                          placeholder="Write your announcement here..."
                        ></textarea>
                      </div>
                      <Button className="w-full">Post Announcement</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Discussion Management
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Monitor and moderate user discussions and comments
                      </p>
                      <Button className="w-full">View Discussion Board</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Monitor activity, set permissions, handle backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Access Control
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label>Two-Factor Authentication</label>
                        <input type="checkbox" checked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label>Password Rotation Policy</label>
                        <input type="checkbox" className="toggle" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm mb-1">Session Timeout (minutes)</label>
                        <Input type="number" value="30" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      Backup & Recovery
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Last backup: April 5, 2023 at 2:30 AM
                      </p>
                      <div className="flex gap-3">
                        <Button onClick={handleBackup} className="flex-1">Create Backup</Button>
                        <Button variant="outline" className="flex-1">Restore</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Activity Log
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Recent security events and admin actions
                      </p>
                      <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                        <div className="py-2 border-b">
                          <p className="text-sm">Admin login - admin@example.com</p>
                          <p className="text-xs text-muted-foreground">April 6, 2023 at 10:23 AM</p>
                        </div>
                        <div className="py-2 border-b">
                          <p className="text-sm">User password reset - john@example.com</p>
                          <p className="text-xs text-muted-foreground">April 6, 2023 at 9:45 AM</p>
                        </div>
                        <div className="py-2 border-b">
                          <p className="text-sm">Failed login attempt - unknown@example.com</p>
                          <p className="text-xs text-muted-foreground">April 5, 2023 at 11:17 PM</p>
                        </div>
                        <div className="py-2">
                          <p className="text-sm">System backup completed</p>
                          <p className="text-xs text-muted-foreground">April 5, 2023 at 2:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
