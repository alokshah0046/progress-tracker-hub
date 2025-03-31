
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProfileData {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  country?: string;
  college?: string;
  profile_photo?: string;
}

export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: ProfileData) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
    toast.success("Profile updated successfully!");
    return true;
  } catch (error: any) {
    toast.error(error.message || "Error updating profile");
    return false;
  }
};

export const uploadProfilePhoto = async (userId: string, file: File) => {
  try {
    // Create a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    // Check if storage bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.find(bucket => bucket.name === 'profiles')) {
      await supabase.storage.createBucket('profiles', {
        public: true,
        fileSizeLimit: 1024 * 1024 * 2, // 2MB
      });
    }

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
    
    // Update user profile with the new photo URL
    await updateProfile(userId, { profile_photo: data.publicUrl });
    
    return data.publicUrl;
  } catch (error: any) {
    toast.error(error.message || "Error uploading profile photo");
    return null;
  }
};
