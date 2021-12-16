import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { Animation } from "../../media/Animation";
import { fullScreen } from "../../styles/fullScreen";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router";

export interface NotFoundProps {
  path?: string;
}

const NotFound = (props: NotFoundProps): ReactElement => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { path } = props;

  return (
    <Box
      sx={{
        ...fullScreen,
        background: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "column",
        gap: 4,
        color: theme.palette.text.primary,
      }}
    >
      <Animation type="notFound" style={{ height: 240, width: 240 }} />
      <Typography variant="h2">Not Found</Typography>
      <Button onClick={() => navigate("/home")} startIcon={<MdChevronLeft />}>
        Back to the Falcon
      </Button>
    </Box>
  );
};

export default NotFound;
