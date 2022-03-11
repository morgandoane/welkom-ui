import React, { ReactElement } from 'react';
import {
    createTheme,
    ThemeProvider,
    PaletteOptions,
    Theme,
    responsiveFontSizes,
} from '@mui/material/styles';

import type {} from '@mui/x-data-grid/themeAugmentation';
import { useAuth0 } from '@auth0/auth0-react';
import { TypeBackground } from '@mui/material/styles/createPalette';

export interface CustomBackground extends TypeBackground {
    secondary: React.CSSProperties['color'];
}

declare module '@mui/material/styles' {
    interface TypographyVariants {
        crisp: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        crisp?: React.CSSProperties;
    }

    interface TypographyVariants {
        crisp: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        crisp?: React.CSSProperties;
    }

    interface Theme {
        status: {
            danger: React.CSSProperties['color'];
        };
    }

    interface Palette {
        tonal: string;
    }
    interface PaletteOptions {
        tonal: string;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        crisp: true;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/' {
    interface TypographyPropsVariantOverrides {
        crisp: true;
    }
}

export const getTheme = (mode: 'light' | 'dark'): Theme => {
    const background: Record<'light' | 'dark', PaletteOptions['background']> = {
        light: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
        },
        dark: {
            default: '#141414',
            paper: '#212121',
        },
    };

    return createTheme({
        palette: {
            mode,
            primary: {
                main: '#2C52F5',
            },
            tonal: mode == 'dark' ? '#1A1A1A' : '#FDFDFD',
            background: background[mode],
            success: {
                main: '#2E8C41',
            },
        },
        shape: {
            borderRadius: 2,
        },
        typography: {
            h1: {
                fontWeight: 900,
                fontSize: '4rem',
            },
            crisp: {
                fontFamily: 'rubik',
                fontSize: '3rem',
                fontWeight: 800,
            },
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: 'filled',
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
                        textTransform: 'none',
                        boxShadow: 'none',
                    },
                },
                defaultProps: {
                    color: 'primary',
                },
            },
            MuiButton: {
                defaultProps: {
                    variant: 'contained',
                    color: 'primary',
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    },
                    sizeLarge: {
                        height: 56,
                    },
                    containedInherit:
                        mode == 'dark'
                            ? {
                                  background: '#212121',
                                  ':hover': {
                                      background: '#363636',
                                  },
                              }
                            : {},
                },
            },

            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontSize: '1rem',
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
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        fontSize: '1rem',
                        fontWeight: 800,
                    },
                },
            },
        },
    });
};

export interface AppThemeContext {
    mode: 'dark' | 'light';
    setMode: (mode: 'dark' | 'light') => void;
}

export const Context = React.createContext<AppThemeContext>({
    mode: 'light',
    setMode: (val) => null,
});

const AppThemeProvider = (props: { children: ReactElement }): ReactElement => {
    const fromStorage = localStorage.getItem('theme');
    const [mode, setMode] = React.useState<'dark' | 'light'>(
        fromStorage == 'light' ? 'light' : 'dark'
    );
    const theme = getTheme(mode);

    return (
        <Context.Provider
            value={{
                mode,
                setMode: (val) => {
                    localStorage.setItem('theme', val);
                    setMode(val);
                },
            }}
        >
            <ThemeProvider theme={responsiveFontSizes(theme)}>
                {props.children}
            </ThemeProvider>
        </Context.Provider>
    );
};

export default AppThemeProvider;

export const useThemeContext = (): AppThemeContext => React.useContext(Context);
