import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IngredientForm } from '../../../../components/Inputs/Form';
import Ingredient from './components/Ingredient';
import IngredientList from './components/IngredientList';

const Ingredients = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<IngredientList />} />
            <Route path=":id" element={<Ingredient />} />
            <Route path=":id/edit" element={<IngredientForm />} />
            <Route path="new" element={<IngredientForm />} />
        </Routes>
    );
};

export default Ingredients;
