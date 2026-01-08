import { useAdminPizzas } from "./useAdminPizzas";
import styles from "./AdminDashboard.module.scss";
import TableLoader from "../../../components/admin/TableLoader/TableLoader";
import AdminDataTable from "../../../components/admin/AdminDataTable/AdminDataTable";
import { pizzaColumns } from "./AdminDashboardColumns";

export default function AdminDashboard() {
  const { pizzas, loading, error } = useAdminPizzas();


  if (error) {
    return <div className={styles.adminError}>Ошибка загрузки данных</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Пиццы</h1>
      </div>
  
      <div className={styles.tableWrapper}>
        {loading && <TableLoader />}
        <AdminDataTable columns={pizzaColumns} data={pizzas}/>
      </div>
    </div>
  );
  
}
