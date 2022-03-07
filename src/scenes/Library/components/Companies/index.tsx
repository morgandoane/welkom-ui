import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CompanyForm, LocationForm } from '../../../../components/Inputs/Form';
import CompaniesList from './components/CompaniesList';
import Company from './components/Company';

const Companies = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<CompaniesList />} />
            <Route path=":id" element={<Company />} />
            <Route path=":id/edit" element={<CompanyForm />} />
            <Route path=":company_id/:id/edit" element={<LocationForm />} />
            <Route path=":company_id/newlocation" element={<LocationForm />} />
            <Route path="new" element={<CompanyForm />} />
        </Routes>
    );
};

export default Companies;
