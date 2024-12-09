import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";


type AuthContextType = {
  user: User | null;
  loading: boolean;
//   logout: () => Promise<void>;
};

type User = {
  _id: string; // MongoDB ObjectID in string format
  displayName: string;
  email: string;
  emailVerified: boolean;
  role: "USER" | "ADMIN" | "MODERATOR"; // Extend roles as needed
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"; // Possible account statuses
  bookmarks: []; // Define the type of bookmarks if known
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  verificationToken?: string; // Optional, as it might not exist for verified users
  __v: number; // Version key for Mongoose
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getUser() {
    try {
      setLoading(true);
      const response = await apiClient.get<User>("/auth/me");
      console.log(response.data);
      setUser(response?.data || null);
      console.log(user);

      setLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

//   async function logout() {
//     try {
//       setLoading(true);
//       await apiClient.post("/auth/logout");
//       setUser(null);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   }
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
