import { Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import AppNav from "../../../../components/AppNav";

export interface HomeRenderProps {
  data: null;
}

const HomeRender = (props: HomeRenderProps): ReactElement => {
  const theme = useTheme();
  const {} = props;

  return <AppNav></AppNav>;
};

export default HomeRender;
