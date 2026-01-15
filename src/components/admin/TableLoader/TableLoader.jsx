import styles from "./TableLoader.module.scss";

export default function TableLoader() {
  return (
    <div className={styles.fullLoader}>
      <div className={styles.loader} />
    </div>
  );
}