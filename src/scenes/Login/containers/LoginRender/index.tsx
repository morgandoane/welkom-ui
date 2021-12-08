import { Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

export interface LoginRenderProps {
  data: null;
}

const LoginRender = (props: LoginRenderProps): ReactElement => {
  const theme = useTheme();
  const {} = props;

  return <Box></Box>;
};

export default LoginRender;
