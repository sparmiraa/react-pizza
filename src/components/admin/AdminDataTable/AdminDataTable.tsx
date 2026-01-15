import DataTable from "react-data-table-component";
import { AdminDataTableProps } from "./AdminDataTableTypes";
import styles from "../../../pages/admin/AdminDashboard/AdminDashboard.module.scss";
import TableLoader from "../TableLoader/TableLoader";
import { useNavigate } from "react-router-dom";
import { Pizza } from "../../../pages/admin/AdminDashboard/AdminPizzaTypes";
import { useState } from "react";

export default function AdminDataTable({
  columns,
  data,
  loading,
}: AdminDataTableProps) {
  const navigate = useNavigate();

  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const handleSelectedRow = (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Pizza[];
  }) => {
    setSelectedPizza(selected.selectedRows[0] ?? null);
  };

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
        onSelectedRowsChange={handleSelectedRow}
        fixedHeader
        responsive
        progressPending={loading}
        progressComponent={<TableLoader />}
        contextComponent={
          selectedPizza && (
            <>
              <button className="button" onClick={() => navigate("/admin/pizza/" + selectedPizza.id)}>
                Редактировать
              </button>

              <button className="button" >
                Удалить
              </button>
            </>
          )
        }
        actions={
          <button
            className="button"
            onClick={() => navigate("/admin/pizza/new")}
          >
            + Создать пиццу
          </button>
        }
      />
    </div>
  );
}
