import { AuthMode } from "../components/AuthModal/AuthModalTypes";

export type AuthModalContextType = {
    isOpen: boolean;
    mode: AuthMode;
    open: (mode: AuthMode) => void;
    close: () => void;
  };