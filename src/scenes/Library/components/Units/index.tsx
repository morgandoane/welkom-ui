import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UnitForm, LocationForm } from '../../../../components/Inputs/Form';
import Unit from './components/Unit';
import UnitsList from './components/UnitsList';

const Units = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<UnitsList />} />
            <Route path=":id" element={<Unit />} />
            <Route path=":id/edit" element={<UnitForm />} />
            <Route path=":unit_id/:id/edit" element={<LocationForm />} />
            <Route path=":unit_id/newlocation" element={<LocationForm />} />
            <Route path="new" element={<UnitForm />} />
        </Routes>
    );
};

export default Units;
