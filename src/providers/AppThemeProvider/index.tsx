import React, { ReactElement } from "react";
import {
  createTheme,
  ThemeProvider,
  PaletteOptions,
  Theme,
  responsiveFontSizes,
} from "@mui/material/styles";

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
      default: "linear-gradient(#1F1F1F, #141414)",
      // default: "#141414",
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
  const theme = getTheme("dark");
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      {props.children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
