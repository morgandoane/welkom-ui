import { LoadingButton } from '@mui/lab';
import { Box, Button, useTheme } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdEdit } from 'react-icons/md';
import AppFab from '../../../../../../../../components/AppFab';
import Details from '../../../../../../../../components/Details';
import CarefulButton from '../../../../../../../../components/Forms/CarefulButton';
import FormRow from '../../../../../../../../components/Forms/components/FormRow';
import TextFormField from '../../../../../../../../components/Forms/components/TextFormField';
import PanelHeader from '../../../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../../../components/SideDrawer';
import {
    UpdateCompanyArgs,
    UpdateCompanyRes,
    useCompanyUpdate,
} from '../../../../../../../../graphql/mutations/company/useCompanyUpdate';
import { Company } from '../../../../../../../../graphql/schema/Company/Company';
import { OperationResult } from '../../../../../../../../graphql/types';
import { dateFormats } from '../../../../../../../../utils/dateFormats';
import { MdRefresh } from 'react-icons/md';
import { TinyCompanies } from '../../../../../../../../graphql/queries/companies/useTinyCompanies';
import { CompanyQuery } from '../../../../../../../../graphql/queries/companies/useCompany';

export interface CompanyDetailsProps {
    company: Company;
}

const CompanyDetails = (props: CompanyDetailsProps): ReactElement => {
    const theme = useTheme();
    const { company } = props;

    const [state, setState] = React.useState<UpdateCompanyArgs | null>(null);

    const [result, setResult] =
        React.useState<OperationResult<UpdateCompanyRes> | null>(null);

    const [update, { loading }] = useCompanyUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [
            TinyCompanies,
            'TinyCompanies',
            CompanyQuery,
            'CompanyQuery',
        ],
    });

    const onClose = () => {
        setResult(null);
        setState(null);
    };

    return (
        <Box sx={{ paddingTop: 4 }}>
            <Details gap={4}>
                {[
                    { key: 'Name', value: company.name },
                    { key: 'Created by', value: company.created_by.name },
                    {
                        key: 'Date created',
                        value: format(
                            new Date(company.date_created),
                            dateFormats.condensedDate
                        ),
                    },
                    {
                        key: 'Last modified by',
                        value: !company.modified_by
                            ? '-'
                            : company.modified_by.name,
                    },
                    {
                        key: 'Date modified',
                        value: !company.date_modified
                            ? 'Never'
                            : format(
                                  new Date(company.date_modified),
                                  dateFormats.condensedDate
                              ),
                    },
                ]}
            </Details>

            {company.deleted ? (
                <AppFab
                    disabled={loading}
                    sx={{
                        backgroundColor: theme.palette.error.main,
                        '&:hover': {
                            backgroundColor: theme.palette.error.dark,
                        },
                    }}
                    icon={<MdRefresh />}
                    onClick={() => {
                        update({
                            variables: {
                                id: company._id,
                                data: {
                                    name: company.name,
                                    deleted: false,
                                },
                            },
                        });
                    }}
                >
                    Reinstate
                </AppFab>
            ) : (
                <AppFab
                    icon={<MdEdit />}
                    onClick={() => {
                        setState({
                            id: company._id,
                            data: {
                                name: company.name,
                            },
                        });
                    }}
                >
                    Edit
                </AppFab>
            )}
            <SideDrawer
                loading={loading}
                open={Boolean(state)}
                onClose={onClose}
                error={
                    result && result.success == false ? result.error : undefined
                }
                success={
                    result && result.success == true
                        ? 'Company saved'
                        : undefined
                }
            >
                <PanelHeader
                    onClose={onClose}
                >{`Update ${company.name}`}</PanelHeader>
                <Box p={1} />
                <FormRow>
                    <TextFormField
                        disabled={loading}
                        label="Name"
                        value={state ? state.data.name : ''}
                        onChange={(val) => {
                            if (state)
                                setState({
                                    ...state,
                                    data: { ...state.data, name: val || '' },
                                });
                        }}
                    />
                </FormRow>
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CarefulButton
                            disabled={loading}
                            onClick={() => {
                                if (state) {
                                    const variables = { ...state };
                                    variables.data.deleted = true;
                                    setState(variables);
                                    update({ variables });
                                }
                            }}
                        >
                            Delete
                        </CarefulButton>
                    </Box>
                    <Box sx={{ flex: 1 }} />
                    <LoadingButton
                        onClick={() => {
                            if (state) update({ variables: state });
                        }}
                        variant="contained"
                        loading={loading}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </SideDrawer>
        </Box>
    );
};

export default CompanyDetails;
