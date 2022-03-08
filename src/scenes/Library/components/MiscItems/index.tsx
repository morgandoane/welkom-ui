import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MiscItemForm } from '../../../../components/Inputs/Form';
import MiscItem from './components/MiscItem';
import MiscItemList from './components/MiscItemList';

const MiscItems = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<MiscItemList />} />
            <Route path=":id" element={<MiscItem />} />
            <Route path=":id/edit" element={<MiscItemForm />} />
            <Route path="new" element={<MiscItemForm />} />
        </Routes>
    );
};

export default MiscItems;
