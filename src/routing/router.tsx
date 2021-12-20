import React, { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Library from "../scenes/Library";
import Login from "../scenes/Login";
import Logistics from "../scenes/Logistics";
import Logout from "../scenes/Logout";
import NotFound from "../scenes/NotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export const Router = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/logistics" />} />
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
        path="/logistics/*"
        element={
          <AuthenticatedRoute>
            <Logistics />
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
