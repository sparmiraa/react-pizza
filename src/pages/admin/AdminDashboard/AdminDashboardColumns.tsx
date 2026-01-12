import { Pizza } from "./AdminPizzaTypes";
import styles from "./AdminDashboard.module.scss";

export const pizzaColumns = [
  {
    name: "ID",
    selector: (row: Pizza) => row.id,
    sortable: true,
    minWidth: "30px",
    maxWidth: "80px",
  },
  {
    name: "Название",
    selector: (row: Pizza) => row.title,
    sortable: true,
    minWidth: "250px",
  },
  {
    name: "Цена",
    selector: (row: Pizza) => `${row.price} ₽`,
    sortable: true,
    minWidth: "80px",
  },
  {
    name: "Рейтинг",
    selector: (row: Pizza) => row.rating,
    sortable: true,
    minWidth: "80px",
    maxWidth: "120px",
  },
  {
    name: "Изображение",
    cell: (row: Pizza) => (
      <img className={styles.pizzaImg} src={row.imageUrl} alt={row.title} />
    ),
    minWidth: "120px",
    center: true,
  },
];
