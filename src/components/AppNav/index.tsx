import {
  useTheme,
  Box,
  LinearProgress,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { ReactElement, ReactNode } from "react";
import {
  MdChevronLeft,
  MdOutlineWarning,
  MdWarning,
  MdWarningAmber,
} from "react-icons/md";
import { fullScreen } from "../../styles/fullScreen";
import Message from "../Message";
import Sidebar from "./components/Sidebar";

export interface AppNavProps {
  data?: null;
  children?: ReactElement | ReactNode | (ReactElement | ReactNode)[];
  loading?: boolean;
  error?: Error;
  includeError?: boolean;
}

const AppNav = (props: AppNavProps): ReactElement => {
  const { children, loading, error, includeError } = props;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const large = useMediaQuery(theme.breakpoints.down("lg"));

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
      {loading && (
        <Box
          sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 8 }}
        >
          <LinearProgress />
        </Box>
      )}
      <Sidebar />
      <Box sx={{ flex: 1, padding: small ? 0 : medium ? 2 : 4 }}>
        {error ? (
          <Message
            type="Warning"
            message={error.message}
            error={includeError ? error : undefined}
          />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default AppNav;
