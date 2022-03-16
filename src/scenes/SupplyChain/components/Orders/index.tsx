import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { OrderForm } from '../../../../components/Inputs/Form';
import OrderDetail from './components/OrderDetail';
import OrderList from './components/OrderList';

const Orders = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderDetail />} />
            <Route path=":id/edit" element={<OrderForm />} />
            <Route path="new" element={<OrderForm />} />
        </Routes>
    );
};

export default Orders;
