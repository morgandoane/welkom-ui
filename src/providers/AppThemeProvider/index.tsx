import React, { ReactElement } from "react";
import {
  createTheme,
  ThemeProvider,
  PaletteOptions,
  Theme,
} from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark"): Theme => {
  const background: Record<"light" | "dark", PaletteOptions["background"]> = {
    light: {
      default: "#FEFDFD",
      paper: "#FFFFFF",
    },
    dark: {
      // default: "linear-gradient(#1F1F1F, #141414)",
      default: "#141414",
      paper: "#212121",
    },
  };

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#2C52F5",
      },
      background: background[mode],
      success: {
        main: "#2E8C41",
      },
    },
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          tag: {
            marginTop: 6,
            marginBottom: 6,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          color: "primary",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            padding: 0,
            paddingRight: 24,
          },
        },
      },
      MuiTabs: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          indicator: {
            height: 4,
            maxWidth: 36,
            borderRadius: 2,
          },
        },
      },
    },
  });
};

const AppThemeProvider = (props: { children: ReactElement }): ReactElement => {
  return (
    <ThemeProvider theme={getTheme("dark")}>{props.children}</ThemeProvider>
  );
};

export default AppThemeProvider;
