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
import { UserMetaData } from '../../graphql/schema/Profile/Profile';
import { useUserPreferenceUpdate } from '../../graphql/mutations/userPreferences/UpdateUserPreferences';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        crisp: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        crisp?: React.CSSProperties;
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

export const getTheme = (mode: 'light' | 'dark'): Theme => {
    const background: Record<'light' | 'dark', PaletteOptions['background']> = {
        light: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
            // default: "#FEFDFD",
            // paper: "#FFFFFF",
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
                    },
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
            MuiDataGrid: {
                defaultProps: {
                    disableColumnFilter: true,
                    disableColumnMenu: true,
                    disableColumnSelector: true,
                    disableSelectionOnClick: true,
                    disableVirtualization: true,
                    filterMode: 'server',
                    pageSize: 50,
                    paginationMode: 'server',
                    sortingMode: 'server',
                },
                styleOverrides: {
                    root: {
                        border: 'none',
                    },
                    cell: {
                        border: 'none',
                        borderBottom:
                            mode == 'light'
                                ? '1px solid rgba(0,0,0,0.12)'
                                : '1px solid rgba(255, 255, 255, 0.12)',
                    },
                    columnSeparator: {
                        display: 'none',
                    },
                    columnHeaders: {
                        background: background[mode]?.paper,
                        border: 'none',
                    },
                    sortIcon: {
                        display: 'none',
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
    const { user } = useAuth0<UserMetaData>();
    const fromStorage = localStorage.getItem('theme');
    const [mode, setMode] = React.useState<'dark' | 'light'>(
        fromStorage == 'light' ? 'light' : 'dark'
    );
    const theme = getTheme(mode);

    const [update] = useUserPreferenceUpdate();

    return (
        <Context.Provider
            value={{
                mode,
                setMode: (val) => {
                    localStorage.setItem('theme', val);
                    setMode(val);
                    update({
                        variables: {
                            data: {
                                prefers_dark_mode: val == 'dark',
                            },
                        },
                    });
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
