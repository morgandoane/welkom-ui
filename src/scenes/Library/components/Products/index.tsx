import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductForm } from '../../../../components/Inputs/Form';
import Product from './components/Product';
import ProductList from './components/ProductList';

const Products = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<ProductList />} />
            <Route path=":id" element={<Product />} />
            <Route path=":id/edit" element={<ProductForm />} />
            <Route path="new" element={<ProductForm />} />
        </Routes>
    );
};

export default Products;
