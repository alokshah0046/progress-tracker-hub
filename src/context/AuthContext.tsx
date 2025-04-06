import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  userRole: string;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  checkUserRole: () => Promise<string>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("user"); // Default role is user
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check user role - simplified to work with existing schema
  const checkUserRole = async (): Promise<string> => {
    if (!user) return "user";
    
    try {
      // For now, we'll use a simplified approach - all users have 'user' role
      // In the future, you can add a user_roles table to implement this properly
      
      // This is a placeholder for checking admin status - in a real implementation
      // you would query a user_roles table to determine the user's role
      
      // For demo purposes, if the email has "admin" in it, grant admin role
      const isAdmin = user.email?.includes("admin") || false;
      const role = isAdmin ? "admin" : "user";
      
      setUserRole(role);
      return role;
    } catch (error) {
      console.error("Error checking user role:", error);
      return "user"; // Default to user role on error
    }
  };

  useEffect(() => {
    // Handle OAuth redirects
    const handleOAuthRedirect = async () => {
      // Check if we have a hash in the URL (which happens with OAuth redirects)
      if (location.hash && location.hash.includes('access_token')) {
        try {
          setLoading(true);
          // Process the URL with hash parameters
          const { data, error } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );
          
          if (error) {
            throw error;
          }
          
          if (data?.session) {
            setSession(data.session);
            setUser(data.session.user);
            await checkUserRole(); // Check the user's role
            toast.success("Logged in successfully!");
            navigate("/dashboard", { replace: true });
          }
        } catch (error: any) {
          toast.error(error.message || "Error processing authentication");
          console.error("OAuth redirect error:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    handleOAuthRedirect();
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            // Use setTimeout to prevent potential auth deadlocks
            setTimeout(() => {
              checkUserRole();
            }, 0);
          }
        } else if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
          setUserRole("user");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkUserRole();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [location, navigate]);

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up");
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  const googleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Error signing in with Google");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        userRole,
        signUp,
        signIn,
        signOut,
        googleSignIn,
        checkUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
