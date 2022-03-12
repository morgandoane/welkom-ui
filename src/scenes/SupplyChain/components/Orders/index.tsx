import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderDetail from './components/OrderDetail';
import OrderList from './components/OrderList';

const Orders = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderDetail />} />
            <Route path=":id/edit" element={<OrderDetail />} />
            <Route path="new" element={<OrderDetail />} />
        </Routes>
    );
};

export default Orders;
