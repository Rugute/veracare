"use client";
import { createContext, PropsWithChildren, useContext } from "react";

// It's good practice to use lowercase 'user' for the property name
interface ContextProps {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps extends PropsWithChildren {
  // These props should act as the "Initial State" passed from the Server
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialUser: any;
  initialAuth: boolean;
}

export const AuthContextProvided = ({
  children,
  initialUser,
  initialAuth,
}: ContextProviderProps) => {
  const value = {
    isAuthenticated: initialAuth,
    user: initialUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvided",
    );
  }
  return context;
};
