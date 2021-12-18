import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Companies from "./components/Companies";
import Items from "./components/Items";

const Library = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Navigate to="companies" />}></Route>
      <Route path="/companies/*" element={<Companies />} />
      <Route path="conversions" element={<Companies />}></Route>
      <Route path="/items/*" element={<Items />} />
      <Route path="units" element={<Companies />}></Route>
    </Routes>
  );
};

export default Library;
