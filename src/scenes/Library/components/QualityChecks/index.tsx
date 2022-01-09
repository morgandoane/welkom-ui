import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import QualityCheckDetail from './components/QualityCheckDetail';
import QualityCheckForm from './components/QualityCheckForm';
import QualityCheckList from './components/QualityCheckList';

const QualityChecks = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<QualityCheckList />} />
            <Route path=":id" element={<QualityCheckDetail />} />
            <Route path=":id/edit" element={<QualityCheckForm />} />
            <Route path="new" element={<QualityCheckForm />} />
        </Routes>
    );
};

export default QualityChecks;
