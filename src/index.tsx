import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppThemeProvider from './providers/AppThemeProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import AuthProvider from './providers/AuthProvider';
import ApolloProvider from './providers/ApolloProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { Router } from './routing/router';

import { UploadProvider } from './providers/UploadProvider';
import ErrorProvider from './providers/ErrorProvider';
import TypefaceProvider from './providers/TypefaceProvider';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ApolloProvider>
                <AppThemeProvider>
                    <ErrorProvider>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <SnackbarProvider>
                                <UploadProvider>
                                    <TypefaceProvider>
                                        <Router />
                                    </TypefaceProvider>
                                </UploadProvider>
                            </SnackbarProvider>
                        </LocalizationProvider>
                    </ErrorProvider>
                </AppThemeProvider>
            </ApolloProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
