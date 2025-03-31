
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Save, User, MapPin, Mail, School } from "lucide-react";
import ProfilePhotoUploader from "./ProfilePhotoUploader";
import { ProfileData } from "@/services/profileService";

interface ProfileFormProps {
  profile: ProfileData;
  isLoading: boolean;
  isUploading: boolean;
  userId: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  updateProfilePhoto: (photoUrl: string) => void;
  getInitials: () => string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  isLoading,
  userId,
  handleChange,
  handleSubmit,
  updateProfilePhoto,
  getInitials,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Profile Photo */}
      <ProfilePhotoUploader 
        profilePhoto={profile.profile_photo || ""} 
        userId={userId} 
        onPhotoUploaded={updateProfilePhoto}
        getInitials={getInitials}
      />
      
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
                value={profile.first_name || ""}
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
                value={profile.last_name || ""}
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
                value={profile.email || ""}
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
                value={profile.country || ""}
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
                value={profile.college || ""}
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
  );
};

export default ProfileForm;
