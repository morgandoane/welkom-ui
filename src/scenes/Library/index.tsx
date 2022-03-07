import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Companies from './components/Companies';
import Ingredients from './components/Ingredients';
import Packaging from './components/Packaging';
import Products from './components/Products';

const Library = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="companies" />} />
            <Route path="companies/*" element={<Companies />} />
            <Route path="ingredients/*" element={<Ingredients />} />
            <Route path="packaging/*" element={<Packaging />} />
            <Route path="products/*" element={<Products />} />
        </Routes>
    );
};

export default Library;
