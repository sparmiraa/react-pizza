import styles from "./NotFoundItems.module.scss";
type NotFoundItemsProps = {
  title: string;
};

export default function NotFoundItems({ title }: NotFoundItemsProps) {
  return <h2 className={styles.root}>{title}</h2>;
}
