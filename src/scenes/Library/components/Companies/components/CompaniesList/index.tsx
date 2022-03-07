import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { CompanyFilter } from '../../../../../../graphql/inputsTypes';
import { TinyCompany } from '../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../graphql/schema/Company/useCompanies';

const CompaniesList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<CompanyFilter>({
        skip: 0,
        take: 50,
        name: '',
    });

    const [companies, setCompanies] = React.useState<TinyCompany[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useCompanies({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setCompanies(data.companies.items);
            setCount(data.companies.count);
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
                                    Companies
                                </Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Company
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={companies}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (company) => nav(company._id),
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
                                Name: (d) => d.name,
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default CompaniesList;
