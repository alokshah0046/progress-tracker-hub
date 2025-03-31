
import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile, uploadProfilePhoto, ProfileData } from "@/services/profileService";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    college: "",
    profile_photo: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      
      setIsLoading(true);
      const userData = await getProfile(user.id);
      if (userData) {
        setProfile({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || user.email || "",
          country: userData.country || "",
          college: userData.college || "",
          profile_photo: userData.profile_photo || "",
        });
      }
      setIsLoading(false);
    };
    
    loadProfile();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }
    
    setIsLoading(true);
    
    const success = await updateProfile(user.id, profile);
    
    setIsLoading(false);
    
    if (success) {
      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast.error("You must be logged in to upload a profile photo");
      return;
    }
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 2MB.");
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    
    setIsUploading(true);
    
    const photoUrl = await uploadProfilePhoto(user.id, file);
    
    if (photoUrl) {
      setProfile((prev) => ({ ...prev, profile_photo: photoUrl }));
    }
    
    setIsUploading(false);
  };

  const getInitials = () => {
    return `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={!!user} />
      
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
                {profile.profile_photo ? (
                  <img
                    src={profile.profile_photo}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary/20 text-xl font-medium">
                    {getInitials()}
                  </div>
                )}
                
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  {isUploading ? (
                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="h-6 w-6 text-white" />
                  )}
                </div>
                
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  aria-label="Upload profile picture"
                  onChange={handleFileChange}
                  disabled={isUploading}
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
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={profile.first_name}
                      onChange={handleChange}
                      className="portal-input"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={profile.last_name}
                      onChange={handleChange}
                      className="portal-input"
                      disabled={isLoading}
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
                      disabled={true}
                      title="Email cannot be changed"
                    />
                    <p className="text-xs text-muted-foreground">Email address cannot be changed</p>
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
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
