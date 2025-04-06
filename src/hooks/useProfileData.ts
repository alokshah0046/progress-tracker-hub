
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile, ProfileData } from "@/services/profileService";
import { toast } from "sonner";

export const useProfileData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const profileData = await getProfile(user.id);
        if (profileData) {
          setProfile(profileData);
        } else {
          // Set default profile with email from user
          setProfile({
            id: user.id,
            email: user.email,
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(user.id, profile);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePhoto = (photoUrl: string) => {
    setProfile((prev) => ({
      ...prev,
      profile_photo: photoUrl,
    }));
  };

  const getInitials = () => {
    const first = profile.first_name?.charAt(0) || '';
    const last = profile.last_name?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  return {
    profile,
    isLoading,
    isUploading,
    setIsUploading,
    handleChange,
    handleSubmit,
    updateProfilePhoto,
    getInitials,
    user
  };
};
