import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PackagingForm } from '../../../../components/Inputs/Form';
import Packaging from './components/Packaging';
import PackagingList from './components/PackagingList';

const Companies = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<PackagingList />} />
            <Route path=":id" element={<Packaging />} />
            <Route path=":id/edit" element={<PackagingForm />} />
            <Route path="new" element={<PackagingForm />} />
        </Routes>
    );
};

export default Companies;
