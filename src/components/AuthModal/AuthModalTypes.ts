export type AuthMode = "login" | "register";

export interface AuthModeConfig {
  isLogin: boolean;
  title: string;
  buttonText: string;
  showNameFields: boolean;
  switchLabel: string;
  switchText: string;
  switchMode: AuthMode;
}


