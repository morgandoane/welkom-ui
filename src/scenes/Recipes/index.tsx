import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UiPermission } from '../../auth/UiPermission';
import PermissionRoute from '../../routing/components/PermissionRoute';
import Recipe from './components/Recipe';
import RecipeFolderView from './components/RecipeFolder';
import RecipeForm from './components/RecipeForm';

const Recipes = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<Navigate to="folders" />} />
            <Route
                path="folders/:id"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <RecipeFolderView />
                    </PermissionRoute>
                }
            />
            <Route
                path="folders"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <RecipeFolderView />
                    </PermissionRoute>
                }
            />
            <Route
                path=":id"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <Recipe />
                    </PermissionRoute>
                }
            />
            <Route
                path=":id/new"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <RecipeForm />
                    </PermissionRoute>
                }
            />
            <Route
                path=":id/:version_id/new"
                element={
                    <PermissionRoute permission={UiPermission.Recipes}>
                        <RecipeForm />
                    </PermissionRoute>
                }
            />
        </Routes>
    );
};

export default Recipes;
