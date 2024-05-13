import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130, sortable: false },
  { field: "title", headerName: "Title", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 500,
    valueGetter: (value, arrayRows) => `${arrayRows.description || ""}`,
  },
  {
    field: "state",
    headerName: "State",
    width: 100,
  },
];

export default function DataTable({ rows }) {
  const arrayRows = Array.isArray(rows) ? rows : [rows];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {rows && (
        <DataGrid
          rows={arrayRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}
    </div>
  );
}
