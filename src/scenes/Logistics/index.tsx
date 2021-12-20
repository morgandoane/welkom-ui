import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../../routing/components/AuthenticatedRoute";
import Orders from "./components/Orders";

const Logistics = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Navigate to="orders" />} />
      <Route
        path="orders/*"
        element={
          <AuthenticatedRoute>
            <Orders />
          </AuthenticatedRoute>
        }
      />
    </Routes>
  );
};

export default Logistics;
