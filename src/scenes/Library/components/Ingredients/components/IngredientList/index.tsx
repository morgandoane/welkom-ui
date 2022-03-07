import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { IngredientFilter } from '../../../../../../graphql/inputsTypes';
import { TinyIngredient } from '../../../../../../graphql/schema/Item/extensions/Ingredient/Ingredient';
import { useIngredients } from '../../../../../../graphql/schema/Item/extensions/Ingredient/useIngredients';

const IngredientList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<IngredientFilter>({
        skip: 0,
        take: 50,
        name: '',
    });

    const [ingredient, setIngredient] = React.useState<TinyIngredient[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useIngredients({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setIngredient(data.ingredients.items);
            setCount(data.ingredients.count);
        },
    });

    return (
        <AppNav error={error} loading={loading}>
            <NavContent>
                {{
                    header: (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                                <Typography variant="crisp">
                                    Ingredients
                                </Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Ingredient
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={ingredient}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (ingredient) => nav(ingredient._id),
                            })}
                            pagination={{
                                count,
                                filter,
                                setFilter: (d) =>
                                    setFilter({
                                        ...filter,
                                        ...d,
                                    }),
                            }}
                            controls={{
                                Name: (
                                    <SearchInput
                                        value={filter.name || ''}
                                        onChange={(s) =>
                                            setFilter({ ...filter, name: s })
                                        }
                                    />
                                ),
                            }}
                        >
                            {{
                                Name: (d) => d.names.english,
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default IngredientList;
