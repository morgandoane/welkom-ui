import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Policies from "./components/Policies";
import Teams from "./components/Teams";
import Users from "./components/Users";

const People = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Navigate to="teams" />} />
      <Route path="teams/*" element={<Teams />} />
      <Route path="users/*" element={<Users />} />
      <Route path="policies/*" element={<Policies />} />
    </Routes>
  );
};

export default People;
