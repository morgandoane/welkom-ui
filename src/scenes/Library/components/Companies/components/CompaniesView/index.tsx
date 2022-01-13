import { LoadingButton } from '@mui/lab';
import { Box, Button, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format, setDate } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import SearchField from '../../../../../../components/Forms/components/SearchField';
import TextFormField from '../../../../../../components/Forms/components/TextFormField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../components/SideDrawer';
import SmartTable from '../../../../../../components/SmartTable';
import {
    CreateCompanyArgs,
    CreateCompanyRes,
    useCompanyCreation,
} from '../../../../../../graphql/mutations/company/useCompanyCreation';
import {
    TinyCompanies,
    useTinyCompanies,
} from '../../../../../../graphql/queries/companies/useTinyCompanies';
import { TinyCompany } from '../../../../../../graphql/schema/Company/Company';
import { CompanyFilter } from '../../../../../../graphql/schema/Company/CompanyFilter';
import { OperationResult } from '../../../../../../graphql/types';
import { dateFormats } from '../../../../../../utils/dateFormats';

const CompaniesView = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<CompanyFilter>({
        skip: 0,
        take: 50,
    });

    const [{ companies, count }, setData] = React.useState<{
        count: number;
        companies: TinyCompany[];
    }>({ count: 0, companies: [] });

    const { error, loading } = useTinyCompanies({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: ({ companies }) =>
            setData({ count: companies.count, companies: companies.items }),
    });

    const [result, setResult] =
        React.useState<OperationResult<CreateCompanyRes> | null>(null);

    const [edits, setEdits] = React.useState<CreateCompanyArgs['data'] | null>(
        null
    );

    const [create, { loading: createLoading }] = useCompanyCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [TinyCompanies],
    });

    const onClose = () => {
        setEdits(null);
        setResult(null);
    };

    return (
        <AppNav loading={loading} error={error}>
            <ColumnBox>
                {{
                    header: <PageTitle>Companies</PageTitle>,
                    content: (
                        <SmartTable
                            data={companies}
                            getProps={(c) => ({
                                id: c._id,
                                onClick: (c, e) => nav(c._id),
                            })}
                            search={{
                                label: 'Search by name',
                                value: filter.name || '',
                                setValue: (val) => {
                                    setFilter({
                                        ...filter,
                                        name: val || '',
                                    });
                                },
                            }}
                            action={
                                <Button
                                    onClick={() => setEdits({ name: '' })}
                                    startIcon={<MdAdd />}
                                >
                                    Company
                                </Button>
                            }
                            pagination={{
                                count,
                                skip: filter.skip,
                                take: filter.take,
                                setPage: (p) => {
                                    setFilter({
                                        ...filter,
                                        skip:
                                            p == 1 ? 0 : (p - 1) * filter.take,
                                    });
                                },
                            }}
                        >
                            {{
                                Name: (d) => d.name,
                                ['Created by']: (d) =>
                                    d.created_by.name +
                                    ' - ' +
                                    format(
                                        new Date(d.date_created),
                                        dateFormats.condensedDate
                                    ),

                                ['Last modified']: (d) =>
                                    d.modified_by && d.date_modified
                                        ? d.modified_by.name +
                                          ' - ' +
                                          format(
                                              new Date(d.date_modified),
                                              dateFormats.condensedDate
                                          )
                                        : '',
                            }}
                        </SmartTable>
                    ),
                }}
            </ColumnBox>
            <SideDrawer
                open={Boolean(edits)}
                onClose={onClose}
                error={
                    result && result.success == false ? result.error : undefined
                }
                success={
                    result && result.success == true
                        ? 'Company created!'
                        : undefined
                }
                onSuccess={() => {
                    if (result && result.success == true) {
                        setEdits(null);
                        setResult(null);
                        nav(result.data.createCompany._id);
                    }
                }}
            >
                <PanelHeader onClose={onClose}>Create company</PanelHeader>
                <FormRow>
                    <TextFormField
                        label="Name"
                        value={edits ? edits.name : ''}
                        onChange={(val) => {
                            if (edits) setEdits({ name: val || '' });
                        }}
                    />
                </FormRow>
                <LoadingButton
                    variant="contained"
                    loading={createLoading}
                    onClick={() => {
                        if (edits) create({ variables: { data: edits } });
                    }}
                >
                    Create!
                </LoadingButton>
            </SideDrawer>
        </AppNav>
    );
};

export default CompaniesView;
