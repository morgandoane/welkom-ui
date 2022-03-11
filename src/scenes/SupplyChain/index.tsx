import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OrderQueue from './components/OrderQueue';

const SupplyChain = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="orderqueue" />} />
            <Route path="orderqueue" element={<OrderQueue />} />
        </Routes>
    );
};

export default SupplyChain;
