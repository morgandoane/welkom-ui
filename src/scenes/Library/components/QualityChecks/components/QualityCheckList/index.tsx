import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { QualityCheckFilter } from '../../../../../../graphql/inputsTypes';
import { TinyQualityCheck } from '../../../../../../graphql/schema/QualityCheck/QualityCheck';
import { useQualityChecks } from '../../../../../../graphql/schema/QualityCheck/useQualityChecks';

const QualityChecksList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<QualityCheckFilter>({
        skip: 0,
        take: 50,
        prompt: '',
        item_name: '',
    });

    const [qualitychecks, setQualityChecks] = React.useState<
        TinyQualityCheck[]
    >([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useQualityChecks({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setQualityChecks(data.qualityChecks.items);
            setCount(data.qualityChecks.count);
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
                                    Quality Checks
                                </Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Quality Check
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={qualitychecks}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (qualitycheck) =>
                                    nav(qualitycheck._id),
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
                                Item: (
                                    <SearchInput
                                        placeholder="Item"
                                        value={filter.item_name || ''}
                                        onChange={(item_name) => {
                                            setFilter({ ...filter, item_name });
                                        }}
                                    />
                                ),
                                Prompt: (
                                    <SearchInput
                                        placeholder="Prompt"
                                        value={filter.prompt || ''}
                                        onChange={(prompt) => {
                                            setFilter({ ...filter, prompt });
                                        }}
                                    />
                                ),
                            }}
                        >
                            {{
                                Item: (d) =>
                                    d.item ? d.item.names.english : 'All items',
                                Prompt: (d) => d.prompt.english,
                                ['Asked during']: (d) =>
                                    d.quality_check_category,
                                ['Response type']: (d) => d.quality_check_class,
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default QualityChecksList;
