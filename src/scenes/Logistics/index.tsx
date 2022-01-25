import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthenticatedRoute from '../../routing/components/AuthenticatedRoute';
import ManagerRoute from '../../routing/components/ManagerRoute';
import OrderQueue from './components/OrderQueue';
import Orders from './components/Orders';
import OrderStats from './components/OrderStats';
import Transportation from './components/Transportation';

const Logistics = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="orders" />} />
            <Route path="orders/*" element={<Orders />} />
            <Route path="orderqueue/*" element={<OrderQueue />} />
            <Route path="transportation/*" element={<Transportation />} />
            <Route
                path="statistics/*"
                element={
                    <ManagerRoute>
                        <OrderStats />
                    </ManagerRoute>
                }
            />
        </Routes>
    );
};

export default Logistics;
