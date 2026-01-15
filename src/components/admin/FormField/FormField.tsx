import React from "react";
import styles from "./FormField.module.scss";
import { FormFieldProps } from "./FormFieldTypes";


export const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <label className={styles.field}>
    <span>{label}</span>
    {children}
    {error && <span className={styles.error}>{error}</span>}
  </label>
);