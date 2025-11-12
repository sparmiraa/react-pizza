import React from "react";
import styles from "./FetchError.module.scss";

export default function NotFoundItems() {
  return (
      <h2 className={styles.root}>К сожалению, не удалось загрузить пиццы. Попробуйте повторить попытку позже.😕</h2>
  );
}

