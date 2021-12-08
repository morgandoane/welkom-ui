import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../scenes/Home";
import Login from "../scenes/Login";
import Logout from "../scenes/Logout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export const Router = () => (
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
    </Routes>
  </BrowserRouter>
);
