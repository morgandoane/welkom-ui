import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import CompaniesView from './components/CompaniesView';
import CompanyView from './components/CompanyView';

const Companies = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<CompaniesView />} />
            <Route path="/" element={<CompaniesView />} />
            <Route path=":id" element={<CompanyView />} />
        </Routes>
    );
};

export default Companies;
