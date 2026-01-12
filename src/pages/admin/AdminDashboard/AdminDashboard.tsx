import { useAdminPizzas } from "./useAdminPizzas";
import styles from "./AdminDashboard.module.scss";
import AdminDataTable from "../../../components/admin/AdminDataTable/AdminDataTable";
import { pizzaColumns } from "./AdminDashboardColumns";

export default function AdminDashboard() {
  const { pizzas, loading, error } = useAdminPizzas();

  if (error) {
    return <div className={styles.adminError}>Ошибка загрузки данных</div>;
  }

  return (
    <>
      {/*{loading && <TableLoader />}*/}
      <AdminDataTable columns={pizzaColumns} data={pizzas} loading={loading}/>
    </>
  );
  
}
