import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ItineraryForm } from '../../../../components/Inputs/Form';
import ItineraryAttention from './components/ItineraryAttention';
import ItineraryDetail from './components/ItineraryDetail';
import ItineraryList from './components/ItineraryList';

const Logistics = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<ItineraryList />} />
            <Route path="attention" element={<ItineraryAttention />} />
            <Route path=":id" element={<ItineraryDetail />} />
            <Route path=":id/edit" element={<ItineraryForm />} />
            <Route path="new" element={<ItineraryForm />} />
        </Routes>
    );
};

export default Logistics;
