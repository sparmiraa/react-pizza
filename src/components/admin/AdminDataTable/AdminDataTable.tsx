import DataTable from "react-data-table-component";
import { AdminDataTableProps } from "./AdminDataTableTypes";
import styles from "../../../pages/admin/AdminDashboard/AdminDashboard.module.scss";
import TableLoader from "../TableLoader/TableLoader";

export default function AdminDataTable({
  columns,
  data,
  loading,
}: AdminDataTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <DataTable
        customStyles={{
          header: {
            style: {
              flexGrow: 0,
            },
          },
          responsiveWrapper: {
            style: {
              overflowY: "auto",
              flexGrow: 1,
            },
          },
          rows: { style: { fontSize: "14px", minHeight: "60px" } },
          headCells: {
            style: {
              fontWeight: "600",
              fontSize: "13px",
              textTransform: "uppercase",
              color: "#374151",
            },
          },
          cells: { style: { padding: "12px" } },
        }}
        title={"Пиццы"}
        columns={columns}
        data={data}
        pagination
        selectableRows
        selectableRowsSingle
        fixedHeader
        responsive
        progressPending={loading}
        progressComponent={<TableLoader />}
      />
    </div>
  );
}