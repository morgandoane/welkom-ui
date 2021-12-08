import React, { ReactElement } from "react";
import Grow from "@mui/material/Grow";
import { Box, useTheme } from "@mui/material";
import { IoMdWarning } from "react-icons/io";

export interface SnackbarState {
  open: boolean;
  message: string;
  variant: "error" | "success" | "info";
}

interface SnackbarContext {
  setSnackbar: (data: SnackbarState) => void;
}

const Context = React.createContext<SnackbarContext>({
  setSnackbar: (data: SnackbarState) => null,
});

export const SnackbarProvider = (props: {
  children: ReactElement;
}): ReactElement => {
  const theme = useTheme();
  const [state, setState] = React.useState<SnackbarState>({
    open: false,
    message: "Welcome",
    variant: "info",
  });

  const styleMap: Record<
    SnackbarState["variant"],
    [string, string, ReactElement]
  > = {
    error: [
      "error.main",
      "error.contrastText",
      <IoMdWarning key={"icon_error"} />,
    ],
    success: [
      "success.main",
      "success.contrastText",
      <IoMdWarning key={"icon_success"} />,
    ],
    info: ["info.main", "info.contrastText", <IoMdWarning key={"icon_info"} />],
  };

  const styling = styleMap[state.variant];

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setState((s) => ({ ...s, open: false }));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [state.open]);

  return (
    <Context.Provider value={{ setSnackbar: (data) => setState(data) }}>
      {props.children}
      <Grow in={state.open}>
        <Box
          sx={{
            bgcolor: styling[0],
            color: styling[1],
            padding: 1,
            paddingRight: 1.5,
            borderRadius: 1,
            position: "absolute",
            bottom: 32,
            left: 32,
            display: "flex",
            alignItems: "Center",
          }}
        >
          {styling[2]}
          {state.message}
        </Box>
      </Grow>
    </Context.Provider>
  );
};

export const useSnackbar = (): SnackbarContext => React.useContext(Context);
