import styles from "./FormInput.module.scss";
import { FormInputProps } from "./FormInputTypes";


export default function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  rightElement,
}: FormInputProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {rightElement && (
          <div className={styles.rightElement}>{rightElement}</div>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}