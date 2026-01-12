import { AuthMode } from "../components/AuthModal/AuthModalTypes";

export type AuthModalContextType = {
    isOpen: boolean;
    mode: AuthMode;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    switchAuthMode: () => void;
  };