import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { getTheme } from "../../providers/AppThemeProvider";
import { fullScreen } from "../../styles/fullScreen";

export interface LoadingProps {
  message?: string;
}

const Loading = (props: LoadingProps): ReactElement => {
  const fromStorage = localStorage.getItem("theme");
  const theme = getTheme(fromStorage == "light" ? "light" : "dark");

  return (
    <Box
      sx={{
        ...fullScreen,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        background: theme.palette.background.default,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 8 }}>
        <CircularProgress sx={{ maxHeight: 24, maxWidth: 24 }} />
        <Typography color="textPrimary">{props.message}</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
