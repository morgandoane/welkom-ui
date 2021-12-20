import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../../../../routing/components/AuthenticatedRoute";
import OrderDetail from "./components/OrderDetail";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

const Orders = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<OrderList />} />
      <Route path=":id" element={<OrderDetail />} />
      <Route path=":id/edit" element={<OrderForm />} />
      <Route path="new" element={<OrderForm />} />
    </Routes>
  );
};

export default Orders;
