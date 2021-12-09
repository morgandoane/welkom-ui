import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../scenes/Home";
import Login from "../scenes/Login";
import Logout from "../scenes/Logout";
import NotFound from "../scenes/NotFound";
import Warehouse from "../scenes/Warehouse";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export const Router = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
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
      <Route
        path="/home"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/warehouse/*"
        element={
          <AuthenticatedRoute>
            <Warehouse />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
