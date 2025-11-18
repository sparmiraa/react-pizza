import React from "react";
import styles from "./NotFoundItems.module.scss";

export default function NotFoundItems({title}) {
  return (
      <h2 className={styles.root}>{title}</h2>
  );
}
