import { Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import AppNav from "../../../../components/AppNav";

export interface WarehouseRenderProps {
  data: null;
}

const WarehouseRender = (props: WarehouseRenderProps): ReactElement => {
  const theme = useTheme();
  const {} = props;

  return <AppNav></AppNav>;
};

export default WarehouseRender;
