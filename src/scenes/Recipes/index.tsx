import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UiPermission } from '../../auth/UiPermission';
import PermissionRoute from '../../routing/components/PermissionRoute';
import Recipe from './components/Recipe';
import RecipeFolder from './components/RecipeFolder';

const Recipes = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="folders" />} />
            <Route
                path="folders/:id"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <RecipeFolder />
                    </PermissionRoute>
                }
            />
            <Route
                path="folders"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <RecipeFolder />
                    </PermissionRoute>
                }
            />
            <Route
                path="recipe/:id"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <Recipe />
                    </PermissionRoute>
                }
            />
        </Routes>
    );
};

export default Recipes;
