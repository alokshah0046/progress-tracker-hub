
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Camera, 
  Save, 
  ArrowLeft,
  User,
  MapPin,
  Mail,
  School
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  college: string;
  photoUrl: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock profile data
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "United States",
    college: "MIT",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john&backgroundColor=b6e3f4",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    toast.loading("Updating profile...");
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("Profile updated successfully!");
      setIsLoading(false);
      
      // Redirect back to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1500);
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 pt-24 pb-12 px-4 md:px-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-6 animate-scale-in">
          <form onSubmit={handleSubmit}>
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary/20 text-xl font-medium">
                    {getInitials()}
                  </div>
                )}
                
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  aria-label="Upload profile picture"
                />
              </div>
              
              <p className="mt-2 text-sm text-foreground/70">
                Click to upload a new photo
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      className="portal-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      className="portal-input"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Contact & Location */}
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="portal-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      value={profile.country}
                      onChange={handleChange}
                      className="portal-input"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Education */}
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <School className="h-5 w-5" />
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input
                      id="college"
                      name="college"
                      value={profile.college}
                      onChange={handleChange}
                      className="portal-input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="portal-btn-primary w-full"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
