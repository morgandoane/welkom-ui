import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OrderQueue from './components/OrderQueue';
import Orders from './components/Orders';

const SupplyChain = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="orderqueue" />} />
            <Route path="orderqueue" element={<OrderQueue />} />
            <Route path="orders/*" element={<Orders />} />
        </Routes>
    );
};

export default SupplyChain;
