import React, { ReactElement } from "react";
import { LoginRenderProps } from "../LoginRender";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { fullScreen } from "../../../../styles/fullScreen";
import { useTheme } from "@mui/material";

const LoginLogic = (props: {
  children: (props: LoginRenderProps) => ReactElement;
}): ReactElement => {
  const theme = useTheme();
  const { children } = props;

  const {} = useAuth0();

  return (
    <Box
      sx={{
        ...fullScreen,
        background: theme.palette.background.default,
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: 800,
          background: theme.palette.background.paper,
        }}
      ></Box>
    </Box>
  );
};

export default LoginLogic;
