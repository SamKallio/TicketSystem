import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { priorityOptions } from "../models/TicketModel";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "username", headerName: "Username", width: 120, sortable: false },
  { field: "title", sortable: false, headerName: "Title", width: 130 },
  { field: "category", headerName: "Category", width: 140 },
  {
    field: "date",
    headerName: "Date",
    width: 140,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 200,
    valueGetter: (value, arrayRows) => `${arrayRows.description || ""}`,
  },
  {
    field: "state",
    headerName: "State",
    width: 100,
  },
  {
    field: "assigned",
    headerName: "Assigned",
    width: 120,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
    renderCell: (params) => {
      return <>{priorityOptions[params.value]}</>;
    },
    // Customize sorting to use numeric values
    sortComparator: (v1, v2) => v1 - v2,
  },
];

export default function TicketTable({ rows, showButton }) {
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
          onCellClick={showButton}
          onColumnHeaderClick={() => showButton(null)}
        />
      )}
    </div>
  );
}
