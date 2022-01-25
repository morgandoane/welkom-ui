import React, { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Batch from './components/Batch';
import BatchReports from './components/BatchReports';
import Mixing from './components/Mixing';
import Packing from './components/Packing';

const Production = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="mixing" />} />
            <Route path="mixing/*" element={<Mixing />} />
            <Route path="packing/*" element={<Packing />} />
            <Route path="batchreports" element={<BatchReports />} />
            <Route path="batchreports/:id" element={<Batch />} />
        </Routes>
    );
};

export default Production;
