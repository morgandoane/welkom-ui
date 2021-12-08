import { Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

export interface HomeRenderProps {
  data: null;
}

const HomeRender = (props: HomeRenderProps): ReactElement => {
  const theme = useTheme();
  const {} = props;

  return <Box>Home</Box>;
};

export default HomeRender;
