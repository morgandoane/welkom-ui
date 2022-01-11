import { Box, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import { useRecipeFolder } from '../../../../graphql/queries/recipeFolder/useRecipeFolder';

const RecipeFolder = (): ReactElement => {
    const { id } = useParams();
    const { data, error, loading } = useRecipeFolder({
        variables: {
            id: id || null,
        },
    });

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <PageTitle>Recipes</PageTitle>
                            <Box sx={{ display: 'flex' }}>
                                <Box></Box>
                                <Box sx={{ flex: 1 }} />
                                <Box>
                                    <Button endIcon={<MdAdd />}>New</Button>
                                </Box>
                            </Box>
                        </Box>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default RecipeFolder;
