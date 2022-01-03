import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Team from "./components/Team";
import TeamForm from "./components/TeamForm";
import TeamList from "./components/TeamList";

const Teams = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<TeamList />} />
      <Route path=":id" element={<Team />} />
      <Route path=":id/edit" element={<TeamForm />} />
      <Route path="new" element={<TeamForm />} />
    </Routes>
  );
};

export default Teams;
