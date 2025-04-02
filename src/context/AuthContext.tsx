import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle OAuth redirects
    const handleOAuthRedirect = async () => {
      // Check if we have a hash in the URL (which happens with OAuth redirects)
      if (location.hash && location.hash.includes('access_token')) {
        try {
          setLoading(true);
          // Let Supabase handle the OAuth response
          const { data, error } = await supabase.auth.getSessionFromUrl();
          
          if (error) {
            throw error;
          }
          
          if (data?.session) {
            setSession(data.session);
            setUser(data.session.user);
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
      (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setSession(session);
          setUser(session?.user ?? null);
        } else if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
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
          redirectTo: window.location.origin + '/dashboard',
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
        signUp,
        signIn,
        signOut,
        googleSignIn,
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
