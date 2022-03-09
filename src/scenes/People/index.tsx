import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Accounts from './components/Accounts';
import Teams from './components/Teams';

const People = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="accounts" />} />
            <Route path="accounts/*" element={<Accounts />} />
            <Route path="teams/*" element={<Teams />} />
        </Routes>
    );
};

export default People;
