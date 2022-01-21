import { Box, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import TabFade from '../../../../components/TabFade';
import { useRecipe } from '../../../../graphql/queries/recipe/useRecipe';
import RecipeDetails from './components/RecipeDetails';
import RecipeHistory from './components/RecipeHistory';
import RecipeIngredients from './components/RecipeIngredients';

const Recipe = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const [{ skip, take }, setVersionFilter] = React.useState<{
        skip: number;
        take: number;
    }>({
        skip: 0,
        take: 250,
    });

    const { data, error, loading } = useRecipe({
        variables: {
            id: id || '',
            skip,
            take,
        },
        skip: !id,
    });

    const recipe = data ? data.recipe : null;
    const versionList = data ? data.recipeVersions : null;

    return (
        <AppNav error={error} loading={loading}>
            {recipe && versionList && (
                <ColumnBox>
                    {{
                        header: (
                            <Box>
                                {recipe.folder && (
                                    <Button
                                        onClick={() => {
                                            if (recipe.folder) {
                                                nav(
                                                    `/recipes/folders/${
                                                        recipe.folder.name ==
                                                        'Home'
                                                            ? ''
                                                            : recipe.folder._id
                                                    }`
                                                );
                                            }
                                        }}
                                        variant="text"
                                        color="inherit"
                                        startIcon={<MdChevronLeft />}
                                    >
                                        {recipe.folder.name}
                                    </Button>
                                )}
                                <PageTitle>
                                    {[
                                        'Edit ' + recipe.name,
                                        `Recipe for ${recipe.item.english}`,
                                    ]}
                                </PageTitle>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Ingredients: (
                                        <RecipeIngredients recipe={recipe} />
                                    ),
                                    ...(recipe.active
                                        ? {
                                              ['Version History']: (
                                                  <RecipeHistory
                                                      recipe={recipe}
                                                      versionList={versionList}
                                                  />
                                              ),
                                          }
                                        : {}),
                                    Details: <RecipeDetails recipe={recipe} />,
                                }}
                            </TabFade>
                        ),
                    }}
                </ColumnBox>
            )}
        </AppNav>
    );
};

export default Recipe;
