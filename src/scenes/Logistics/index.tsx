import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../../routing/components/AuthenticatedRoute";
import OrderQueue from "./components/OrderQueue";
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
      <Route
        path="orderqueue/*"
        element={
          <AuthenticatedRoute>
            <OrderQueue />
          </AuthenticatedRoute>
        }
      />
    </Routes>
  );
};

export default Logistics;
