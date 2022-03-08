import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    QualityCheckForm,
    LocationForm,
} from '../../../../components/Inputs/Form';
import QualityCheckList from './components/QualityCheckList';
import QualityCheck from './components/QualityCheck';

const QualityChecks = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<QualityCheckList />} />
            <Route path=":id" element={<QualityCheck />} />
            <Route path=":id/edit" element={<QualityCheckForm />} />
            <Route path="new" element={<QualityCheckForm />} />
        </Routes>
    );
};

export default QualityChecks;
