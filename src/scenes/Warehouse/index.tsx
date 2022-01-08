import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WarehouseDashboard from "./components/WarehouseDashboard";
import FulfillmentDetail from "./components/WarehouseDashboard/components/FulfillmentDetail";
import FulfillmentForm from "./components/WarehouseDashboard/components/FulfillmentForm";

const Warehouse = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Navigate to="receiving" />} />
      <Route
        path="receiving"
        element={<WarehouseDashboard view="receiving" />}
      />
      <Route path="shipping" element={<WarehouseDashboard view="shipping" />} />
      <Route
        path="receiving/:bol_id"
        element={<FulfillmentForm action="receive" />}
      />
      <Route
        path="shipping/:bol_id"
        element={<FulfillmentForm action="ship" />}
      />
      <Route
        path=":shippingorreceiving/:bol_id/:fulfillment_id"
        element={<FulfillmentDetail />}
      />
      <Route
        path=":shippingorreceiving/:bol_id/:fulfillment_id/edit"
        element={<FulfillmentForm />}
      />
    </Routes>
  );
};

export default Warehouse;
