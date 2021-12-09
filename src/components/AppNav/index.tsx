import { useTheme, Box } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";
import { fullScreen } from "../../styles/fullScreen";
import Sidebar from "./components/Sidebar";

export interface AppNavProps {
  data?: null;
  children?: ReactElement | ReactNode | (ReactElement | ReactNode)[];
}

const AppNav = (props: AppNavProps): ReactElement => {
  const { children } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...fullScreen,
        background: theme.palette.background.default,
        display: "flex",
        alignItems: "stretch",
        color: theme.palette.text.primary,
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
};

export default AppNav;
