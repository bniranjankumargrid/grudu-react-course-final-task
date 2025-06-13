import React, { createContext, useContext, useState } from "react";
import { AuthContextType, AuthProviderProps, User } from "../types";

export const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  setLoggedInUser: () => {},
});
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const savedInUser = localStorage.getItem('user');
  const parsedUser = savedInUser ? JSON.parse(savedInUser) as User : null;
  const [loggedInUser, setLoggedInUser] = useState<User | null>(parsedUser);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
