import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import UnitsView from './components/UnitsView';
import UnitView from './components/UnitView';

const Units = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<UnitsView />} />
            <Route path="/" element={<UnitsView />} />
            <Route path=":id" element={<UnitView />} />
        </Routes>
    );
};

export default Units;
