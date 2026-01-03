import { useEffect, useState } from "react";
import styles from "./AuthModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  selectAuthError,
  selectAuthFieldErrors,
  selectAuthStatus,
} from "../../redux/auth/authSelectors";
import { loginThunk, registerThunk } from "../../redux/auth/authThunks";
import { selectUser } from "../../redux/user/userSelectors";
import { clearError } from "../../redux/auth/authSlice";
import Loader from "../Loader/Loader";
import { AuthModalProps } from "./AuthModalTypes";

import hidden from "../../assets/img/hidden.png"
import visible from "../../assets/img/visible.png"

export default function AuthModal({ mode, onClose, onSwitch }: AuthModalProps) {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const status = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectAuthError);
  const fieldErrors = useAppSelector(selectAuthFieldErrors);

  useEffect(() => {
    dispatch(clearError());
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }, [mode]);

  const handleSubmit = async () => {
    if (mode === "login") {
      await dispatch(loginThunk({ email, password }));
    } else {
      await dispatch(registerThunk({ firstName, lastName, email, password }));
    }
  };

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.registerCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.logo}>🍕</div>

        <h1 className={styles.title}>
          {mode === "login" ? "Вход" : "Регистрация"}
        </h1>
        <p className={styles.subtitle}>
          Войдите или создайте аккаунт, чтобы заказывать лучшую пиццу 🍕
        </p>

        <form className={styles.form}>
          {mode === "register" && (
            <>
              <input
                className={styles.input}
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {fieldErrors.firstName && (
                <span className={styles.fieldError}>
                  {fieldErrors.firstName}
                </span>
              )}
              <input
                className={styles.input}
                type="text"
                placeholder="Фамили"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {fieldErrors.lastName && (
                <span className={styles.fieldError}>
                  {fieldErrors.lastName}
                </span>
              )}
            </>
          )}

          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {fieldErrors.email && (
            <span className={styles.fieldError}>{fieldErrors.email}</span>
          )}
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {fieldErrors.password && (
              <span className={styles.fieldError}>{fieldErrors.password}</span>
            )}
            <span
              className={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <img src={hidden} alt="" /> : <img src={visible} alt="" />}
            </span>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="button"
            className={styles.button}
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <Loader />
            ) : mode === "login" ? (
              "Войти"
            ) : (
              "Зарегистрироваться"
            )}
          </button>
        </form>

        <p className={styles.terms}>
          {mode === "login" ? (
            <>
              Нет аккаунта?{" "}
              <span onClick={() => onSwitch("register")}>
                Зарегистрироваться
              </span>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <span onClick={() => onSwitch("login")}>Войти</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
