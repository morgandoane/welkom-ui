import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { UnitFilter } from '../../../../../../graphql/inputsTypes';
import { TinyUnit } from '../../../../../../graphql/schema/Unit/Unit';
import { useUnits } from '../../../../../../graphql/schema/Unit/useUnits';

const UnitsList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<UnitFilter>({
        skip: 0,
        take: 50,
    });

    const [units, setUnits] = React.useState<TinyUnit[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useUnits({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setUnits(data.units.items);
            setCount(data.units.count);
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
                                <Typography variant="crisp">Units</Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Unit
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={units}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (unit) => nav(unit._id),
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

export default UnitsList;
