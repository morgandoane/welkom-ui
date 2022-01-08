import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Companies from "./components/Companies";
import Items from "./components/Items";
import QualityChecks from "./components/QualityChecks";
import Units from "./components/Units";

const Library = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Navigate to="companies" />}></Route>
      <Route path="/companies/*" element={<Companies />} />
      <Route path="conversions" element={<Companies />}></Route>
      <Route path="/items/*" element={<Items />} />
      <Route path="/qualitychecks/*" element={<QualityChecks />} />
      <Route path="/units/*" element={<Units />} />
    </Routes>
  );
};

export default Library;
