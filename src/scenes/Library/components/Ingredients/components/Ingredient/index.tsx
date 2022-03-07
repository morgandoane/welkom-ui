import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttachmentsTab from '../../../../../../components/display/DataTabs/AttachmentsTab';
import DetailsTab from '../../../../../../components/display/DataTabs/DetailsTab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import {
    IngredientQuery,
    useIngredient,
} from '../../../../../../graphql/schema/Item/extensions/Ingredient/useIngredient';

const Ingredient = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useIngredient({
        variables: { id: id || '' },
    });

    const ingredient = data ? data.ingredient : null;

    return (
        <AppNav error={error} loading={loading}>
            {ingredient && (
                <NavContent>
                    {{
                        header: (
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Box>
                                        <BackButton
                                            onClick={() =>
                                                nav('/library/ingredients')
                                            }
                                        >
                                            Ingredient
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {ingredient.names.english}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Item"
                                            data={ingredient}
                                            refetchQueries={[IngredientQuery]}
                                        />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={ingredient}
                                            refetchQueries={[IngredientQuery]}
                                        />
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default Ingredient;
