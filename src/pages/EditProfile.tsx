
import React from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProfileForm from "@/components/profile/ProfileForm";
import { useProfileData } from "@/hooks/useProfileData";

const EditProfile = () => {
  const {
    profile,
    isLoading,
    isUploading,
    handleChange,
    handleSubmit,
    updateProfilePhoto,
    getInitials,
    user
  } = useProfileData();

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
          <ProfileForm 
            profile={profile}
            isLoading={isLoading}
            isUploading={isUploading}
            userId={user?.id || ""}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            updateProfilePhoto={updateProfilePhoto}
            getInitials={getInitials}
          />
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
