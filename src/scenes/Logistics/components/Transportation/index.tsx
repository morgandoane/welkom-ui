import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import BolForm from '../../../../components/Forms/BolForm';
import ItineraryForm from '../../../../components/Forms/ItineraryForm';
import ItineraryDetail from './compnents/ItineraryDetail';
import ItineraryList from './compnents/ItineraryList';

const Transportation = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<ItineraryList />} />
            <Route path=":id" element={<ItineraryDetail />} />
            <Route
                path=":id/:order_id/edit"
                element={<ItineraryForm from_itinerary />}
            />
            <Route
                path=":itinerary_id/bols/new"
                element={<BolForm from_itinerary />}
            />
            <Route
                path=":itinerary_id/bols/:id"
                element={<BolForm from_itinerary />}
            />
            <Route path="new" element={<ItineraryForm from_itinerary />} />
        </Routes>
    );
};

export default Transportation;
