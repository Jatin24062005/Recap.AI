// context/UserContext.tsx or UserProvider.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object | null>(null); // initially no user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optional: hook for easy usage
export const useUser = () => useContext(UserContext);
