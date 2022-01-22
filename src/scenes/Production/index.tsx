import React, { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Mixing from './components/Mixing';

const Production = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="mixing" />} />
            <Route path="mixing/*" element={<Mixing />} />
            <Route path="packing/*" element={<Mixing />} />
        </Routes>
    );
};

export default Production;
