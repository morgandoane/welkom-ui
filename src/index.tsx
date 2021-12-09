import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppThemeProvider from "./providers/AppThemeProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import AuthProvider from "./providers/AuthProvider";
import ApolloProvider from "./providers/ApolloProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { Router } from "./routing/router";

import "@fontsource/roboto";
import "@fontsource/artifika";
import "@fontsource/jost";

ReactDOM.render(
  <React.StrictMode>
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <SnackbarProvider>
          <AuthProvider>
            <ApolloProvider>
              <Router />
            </ApolloProvider>
          </AuthProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </AppThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
