import DataTable from "react-data-table-component";
import { AdminDataTableProps } from "./AdminDataTableTypes";


export default function AdminDataTable({ columns, data }: AdminDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      selectableRows
      selectableRowsSingle  
      fixedHeader
      responsive
      customStyles={{
        rows: { style: { fontSize: "14px", minHeight: "60px" } },
        headCells: { style: { fontWeight: "600", fontSize: "13px", textTransform: "uppercase", color: "#374151" } },
        cells: { style: { padding: "12px" } },
      }}
    />
  );
}