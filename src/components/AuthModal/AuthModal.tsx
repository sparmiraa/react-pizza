import { useEffect, useState } from "react";
import styles from "./AuthModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUser } from "../../redux/user/userSelectors";
import Loader from "../Loader/Loader";

import hidden from "../../assets/img/hidden.png";
import visible from "../../assets/img/visible.png";
import { AuthService } from "../../api/services/authService/authService";
import { getMeThunk } from "../../redux/user/userThunks";
import { parseApiError } from "../../api/parseApiError";
import FormInput from "../FormInput/FormInput";
import { useAuthMode } from "./useAuthMode";
import { useAuthModal } from "../../context/AuthModalContext";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { mode, closeAuthModal, switchAuthMode } = useAuthModal();
  const auth = useAuthMode(mode);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setGlobalError("");
    setFieldErrors({});
  }, [mode]);

  useEffect(() => {
    if (user) closeAuthModal();
  }, [user]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { data } = auth.isLogin
        ? await AuthService.login({ email, password })
        : await AuthService.registration({
            firstName,
            lastName,
            email,
            password,
          });

      localStorage.setItem("accessToken", data.accessToken);
      dispatch(getMeThunk());
    } catch (err) {
      const parsed = parseApiError(err);
      if (parsed.fieldErrors) setFieldErrors(parsed.fieldErrors);
      if (parsed.message) setGlobalError(parsed.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onMouseDown={closeAuthModal}>
      <div
        className={styles.registerCard}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={closeAuthModal}>
          ✕
        </button>

        <div className={styles.logo}>🍕</div>

        <h1 className={styles.title}>{auth.title}</h1>

        <form className={styles.form}>
          {auth.showNameFields && (
            <>
              <FormInput
                placeholder="Имя"
                value={firstName}
                onChange={setFirstName}
                error={fieldErrors.firstName}
              />

              <FormInput
                placeholder="Фамилия"
                value={lastName}
                onChange={setLastName}
                error={fieldErrors.lastName}
              />
            </>
          )}

          <FormInput
            placeholder="Email"
            value={email}
            onChange={setEmail}
            error={fieldErrors.email}
          />

          <FormInput
            placeholder="Пароль"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            rightElement={
              <img
                src={showPassword ? hidden : visible}
                alt=""
                onClick={() => setShowPassword((v) => !v)}
              />
            }
          />

          {globalError && <p className={styles.error}>{globalError}</p>}

          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? <Loader /> : auth.buttonText}
          </button>
        </form>

        <p className={styles.terms}>
          {auth.switchLabel}{" "}
          <span onClick={switchAuthMode}>{auth.switchText}</span>
        </p>
      </div>
    </div>
  );
}
