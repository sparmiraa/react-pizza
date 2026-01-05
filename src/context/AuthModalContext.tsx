import { createContext, ReactNode, useContext, useState } from "react";
import { AuthModalContextType } from "./AuthModalContextTypes";
import { AuthMode } from "../components/AuthModal/AuthModalTypes";

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const open = (mode: AuthMode) => {
    setMode(mode);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, mode, open, close }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("Use useAuthModal only inside AuthModalProvider");
  }

  return ctx;
}
