import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Expenses from './components/Expenses';
import PendingExpenses from './components/PendingExpenses';
import AccountingReports from './components/Reports';

const Accounting = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="expenses" />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="pending" element={<PendingExpenses />} />
            <Route path="reports" element={<AccountingReports />} />
        </Routes>
    );
};

export default Accounting;
