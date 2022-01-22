import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import MixingBoard from './components/MixingBoard';
import MixingCardForm from './components/MixingCardForm';

const Mixing = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<MixingBoard />} />
            <Route path={':id'} element={<MixingCardForm />} />
            <Route path={'new'} element={<MixingCardForm />} />
        </Routes>
    );
};

export default Mixing;
