
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CodingStats {
  id?: string;
  user_id?: string;
  platform: string;
  total_questions?: number;
  easy_questions?: number;
  medium_questions?: number;
  hard_questions?: number;
  active_days?: number;
}

export const getUserStats = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("coding_stats")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error("Error fetching coding stats:", error.message);
    return [];
  }
};

export const updateStats = async (statId: string, updates: Partial<CodingStats>) => {
  try {
    const { error } = await supabase
      .from("coding_stats")
      .update(updates)
      .eq("id", statId);

    if (error) throw error;
    toast.success("Stats updated successfully!");
    return true;
  } catch (error: any) {
    toast.error(error.message || "Error updating stats");
    return false;
  }
};

export const createStats = async (stats: CodingStats) => {
  try {
    const { data, error } = await supabase
      .from("coding_stats")
      .insert(stats)
      .select();

    if (error) throw error;
    toast.success("Stats created successfully!");
    return data[0];
  } catch (error: any) {
    toast.error(error.message || "Error creating stats");
    return null;
  }
};
