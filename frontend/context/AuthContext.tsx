// context/UserContext.tsx or UserProvider.tsx
"use client";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

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
