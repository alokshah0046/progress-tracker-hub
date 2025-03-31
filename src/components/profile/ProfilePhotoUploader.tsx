
import React, { useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { uploadProfilePhoto } from "@/services/profileService";

interface ProfilePhotoUploaderProps {
  profilePhoto: string;
  userId: string;
  onPhotoUploaded: (photoUrl: string) => void;
  getInitials: () => string;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  profilePhoto,
  userId,
  onPhotoUploaded,
  getInitials,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userId) {
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
    
    const photoUrl = await uploadProfilePhoto(userId, file);
    
    if (photoUrl) {
      onPhotoUploaded(photoUrl);
    }
    
    setIsUploading(false);
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative group">
        {profilePhoto ? (
          <img
            src={profilePhoto}
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
  );
};

export default ProfilePhotoUploader;
