import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { PackagingFilter } from '../../../../../../graphql/inputsTypes';
import { TinyPackaging } from '../../../../../../graphql/schema/Item/extensions/Packaging/Packaging';
import { usePackaging } from '../../../../../../graphql/schema/Item/extensions/Packaging/usePackaging';

const PackagingList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<PackagingFilter>({
        skip: 0,
        take: 50,
        name: '',
    });

    const [packaging, setPackaging] = React.useState<TinyPackaging[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = usePackaging({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setPackaging(data.packagings.items);
            setCount(data.packagings.count);
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
                                    Packaging
                                </Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Packaging
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={packaging}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (packaging) => nav(packaging._id),
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

export default PackagingList;
