import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
};

type SignupData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type User = {
  _id: string; // MongoDB ObjectID in string format
  displayName: string;
  email: string;
  emailVerified: boolean;
  role: "USER" | "ADMIN" | "RECRUITER"; // Extend roles as needed
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"; // Possible account statuses
  bookmarks: []; // Define the type of bookmarks if known
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  verificationToken?: string; // Optional, as it might not exist for verified users
  __v: number; // Version key for Mongoose
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      await apiClient.post("/auth/signin", { email, password });

      const userResponse = await apiClient.get("/auth/me");
      setUser(userResponse.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      const response = await apiClient.post("/auth/signup", userData);
      if (response.data.success) {
        await login(userData.email, userData.password);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.get("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // If there's an error, assume the user is not authenticated
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
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
