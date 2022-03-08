import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { MiscItemFilter } from '../../../../../../graphql/inputsTypes';
import { TinyMiscItem } from '../../../../../../graphql/schema/Item/extensions/Misc/MiscItem';
import { useMiscItems } from '../../../../../../graphql/schema/Item/extensions/Misc/useMiscItems';

const MiscItemList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<MiscItemFilter>({
        skip: 0,
        take: 50,
        name: '',
    });

    const [miscitem, setMiscItem] = React.useState<TinyMiscItem[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useMiscItems({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setMiscItem(data.miscItems.items);
            setCount(data.miscItems.count);
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
                                    Misc Items
                                </Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Misc Item
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={miscitem}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (miscitem) => nav(miscitem._id),
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

export default MiscItemList;
