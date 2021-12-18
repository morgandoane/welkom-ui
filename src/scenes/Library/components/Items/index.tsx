import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import ItemsView from "./components/ItemsView";
import ItemView from "./components/ItemView";

const Items = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<ItemsView />} />
      <Route path="/" element={<ItemsView />} />
      <Route path=":id" element={<ItemView />} />
    </Routes>
  );
};

export default Items;
