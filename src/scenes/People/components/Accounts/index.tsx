import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountForm } from '../../../../components/Inputs/Form';
import AccountDetail from './components/AccountDetail';
import AccountsList from './components/AccountsList';

const Accounts = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<AccountsList />} />
            <Route path=":id" element={<AccountDetail />} />
            <Route path=":id/edit" element={<AccountForm />} />
            <Route path="new" element={<AccountForm />} />
        </Routes>
    );
};

export default Accounts;
