import { Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

export interface LoadingProps {
  message?: string;
}

const Loading = (props: LoadingProps): ReactElement => {
  const theme = useTheme();
  const {} = props;

  return <Box></Box>;
};

export default Loading;
