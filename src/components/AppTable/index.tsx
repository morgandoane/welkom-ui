import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import React, { ReactElement } from "react";

const AppTable = (props: DataGridProps): ReactElement => {
  const tableProps: DataGridProps = { disableSelectionOnClick: true, ...props };
  return <DataGrid {...tableProps} />;
};

export default AppTable;
