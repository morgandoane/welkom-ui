import React, { ReactElement } from "react";
import {
  createTheme,
  ThemeProvider,
  PaletteOptions,
  Theme,
  responsiveFontSizes,
} from "@mui/material/styles";

import type {} from "@mui/x-data-grid/themeAugmentation";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    crisp: React.CSSProperties;
    artifika: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    crisp?: React.CSSProperties;
    artifika?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    crisp: true;
    artifika: true;
  }
}

export const getTheme = (mode: "light" | "dark"): Theme => {
  const background: Record<"light" | "dark", PaletteOptions["background"]> = {
    light: {
      default: "#FEFDFD",
      paper: "#FFFFFF",
    },
    dark: {
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
    shape: {
      borderRadius: 2,
    },
    typography: {
      h1: {
        fontWeight: 900,
        fontSize: "4rem",
      },
      artifika: {
        fontFamily: "Artifika",
        fontSize: "2rem",
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: "filled",
        },
      },
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
          disableElevation: true,
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
        styleOverrides: {
          indicator: {
            height: 4,
            maxWidth: 36,
            borderRadius: 2,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor:
              background[mode] && background[mode]?.paper
                ? background[mode]?.paper
                : undefined,
          },
        },
      },
      MuiDataGrid: {
        defaultProps: {
          disableColumnFilter: true,
          disableColumnMenu: true,
          disableColumnSelector: true,
          disableSelectionOnClick: true,
          disableVirtualization: true,
          filterMode: "server",
          pageSize: 50,
          paginationMode: "server",
          sortingMode: "server",
        },
        styleOverrides: {
          root: {
            border: "none",
          },
          cell: {
            border: "none",
            borderBottom:
              mode == "light"
                ? "1px solid rgba(0,0,0,0.12)"
                : "1px solid rgba(255, 255, 255, 0.12)",
          },
          columnSeparator: {
            display: "none",
          },
          columnHeaders: {
            background: background[mode]?.paper,
            border: "none",
          },
          sortIcon: {
            display: "none",
          },
        },
      },
    },
  });
};

const AppThemeProvider = (props: { children: ReactElement }): ReactElement => {
  const theme = getTheme("dark");
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      {props.children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
