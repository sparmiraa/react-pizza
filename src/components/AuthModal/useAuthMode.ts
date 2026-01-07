import { AuthMode, AuthModeConfig } from "./AuthModalTypes";

export function useAuthMode(mode: AuthMode): AuthModeConfig {
  const isLogin = mode === "login";

  return {
    isLogin,
    title: isLogin ? "Вход" : "Регистрация",
    buttonText: isLogin ? "Войти" : "Зарегистрироваться",
    showNameFields: !isLogin,
    switchLabel: isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?",
    switchText: isLogin ? "Зарегистрироваться" : "Войти",
    switchMode: isLogin ? "register" : "login",
  };
}