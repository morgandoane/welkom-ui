import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Companies from './components/Companies';
import Ingredients from './components/Ingredients';
import MiscItems from './components/MiscItems';
import Packaging from './components/Packaging';
import Products from './components/Products';
import QualityChecks from './components/QualityChecks';
import Units from './components/Units';

const Library = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="companies" />} />
            <Route path="companies/*" element={<Companies />} />
            <Route path="ingredients/*" element={<Ingredients />} />
            <Route path="miscitems/*" element={<MiscItems />} />
            <Route path="packaging/*" element={<Packaging />} />
            <Route path="products/*" element={<Products />} />
            <Route path="qualitychecks/*" element={<QualityChecks />} />
            <Route path="units/*" element={<Units />} />
        </Routes>
    );
};

export default Library;
