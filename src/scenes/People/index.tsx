import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profiles from './components/Profiles';
import Teams from './components/Teams';

const People = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="teams" />} />
            <Route path="teams/*" element={<Teams />} />
            <Route path="profiles/*" element={<Profiles />} />
        </Routes>
    );
};

export default People;
