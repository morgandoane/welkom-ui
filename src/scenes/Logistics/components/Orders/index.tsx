import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BolForm from "../../../../components/Forms/BolForm";
import ItineraryForm from "../../../../components/Forms/ItineraryForm";
import OrderDetail from "./components/OrderDetail";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

const Orders = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<OrderList />} />
      <Route path=":id" element={<OrderDetail />} />
      <Route path=":id/edit" element={<OrderForm />} />
      <Route path=":order_id/itineraries/:id" element={<ItineraryForm />} />
      <Route path=":order_id/itineraries/new" element={<ItineraryForm />} />
      <Route
        path=":order_id/itineraries/:itinerary_id/bols/new"
        element={<BolForm />}
      />
      <Route
        path=":order_id/itineraries/:itinerary_id/bols/:id"
        element={<BolForm />}
      />
      <Route path="new" element={<OrderForm />} />
    </Routes>
  );
};

export default Orders;
