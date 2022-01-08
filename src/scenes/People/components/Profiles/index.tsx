import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import AppNav from "../../../../components/AppNav";
import ProfileDetail from "./components/ProfileDetail";
import ProfileForm from "./components/ProfileForm";
import ProfileList from "./components/ProfileList";

const Profiles = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<ProfileList />} />
      <Route path=":id" element={<ProfileDetail />} />
      <Route path=":id/edit" element={<ProfileForm />} />
      <Route path="new" element={<ProfileForm />} />
    </Routes>
  );
};

export default Profiles;
