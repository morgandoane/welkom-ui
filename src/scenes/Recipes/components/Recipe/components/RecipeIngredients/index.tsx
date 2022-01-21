import { Box, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../components/AppFab';
import RecipeVersionPreview from '../../../../../../components/RecipeVersionPreview';
import { Recipe } from '../../../../../../graphql/schema/Recipe/Recipe';
import NoVersion from '../NoVersion';

export interface RecipeIngredientsProps {
    recipe: Recipe;
}

const RecipeIngredients = (props: RecipeIngredientsProps): ReactElement => {
    const { recipe } = props;
    const nav = useNavigate();

    const { palette, shape } = useTheme();

    return (
        <Box sx={{ height: '100%' }}>
            {!recipe.active ? (
                <NoVersion recipe={recipe} />
            ) : (
                <Box sx={{ paddingTop: 3, maxWidth: 500 }}>
                    <RecipeVersionPreview version={recipe.active} />
                </Box>
            )}
            <AppFab
                icon={<MdEdit />}
                onClick={() =>
                    nav(recipe.active ? `${recipe.active._id}/new` : 'new')
                }
            >
                Edit Recipe
            </AppFab>
        </Box>
    );
};

export default RecipeIngredients;
