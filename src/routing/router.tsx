import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Library from "../scenes/Library";
import Login from "../scenes/Login";
import Logout from "../scenes/Logout";
import NotFound from "../scenes/NotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export const Router = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/library/*"
        element={
          <AuthenticatedRoute>
            <Library />
          </AuthenticatedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <AuthenticatedRoute>
            <Logout />
          </AuthenticatedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
