
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile, ProfileData } from "@/services/profileService";

export const useProfileData = () => {
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

  const updateProfilePhoto = (photoUrl: string) => {
    setProfile((prev) => ({ ...prev, profile_photo: photoUrl }));
  };

  const getInitials = () => {
    return `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`;
  };

  return {
    profile,
    isLoading,
    isUploading,
    handleChange,
    handleSubmit,
    updateProfilePhoto,
    getInitials,
    user
  };
};
