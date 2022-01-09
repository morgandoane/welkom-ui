import { Box, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdRefresh, MdEdit } from 'react-icons/md';
import AppFab from '../../../../../../../../components/AppFab';
import {
    UpdateCompanyArgs,
    UpdateCompanyRes,
    useCompanyUpdate,
} from '../../../../../../../../graphql/mutations/company/useCompanyUpdate';
import {
    CreateLocationArgs,
    CreateLocationRes,
    useLocationCreation,
} from '../../../../../../../../graphql/mutations/location/useLocationCreation';
import {
    UpdateLocationArgs,
    UpdateLocationRes,
    useLocationUpdate,
} from '../../../../../../../../graphql/mutations/location/useLocationUpdate';
import { CompanyQuery } from '../../../../../../../../graphql/queries/companies/useCompany';
import { TinyCompanies } from '../../../../../../../../graphql/queries/companies/useTinyCompanies';
import { Company } from '../../../../../../../../graphql/schema/Company/Company';
import { OperationResult } from '../../../../../../../../graphql/types';
import LocationCard from './LocationCard';
import LocationForm from './LocationForm';

export interface CompanyLocationsProps {
    company: Company;
}

const CompanyLocations = (props: CompanyLocationsProps): ReactElement => {
    const theme = useTheme();
    const { company } = props;

    const [state, setState] = React.useState<
        | (CreateLocationArgs & { type: 'create' })
        | ({ type: 'update' } & UpdateLocationArgs)
        | null
    >(null);

    const [result, setResult] = React.useState<OperationResult<
        CreateLocationRes | UpdateLocationRes
    > | null>(null);

    const [update, { loading }] = useCompanyUpdate({
        refetchQueries: [TinyCompanies, 'TinyCompanies'],
    });

    const [createLocation, { loading: createLoading }] = useLocationCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [CompanyQuery, 'CompanyQuery'],
    });

    const [updateLocation, { loading: updateLoading }] = useLocationUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [CompanyQuery, 'CompanyQuery'],
    });

    return (
        <Box
            sx={{ display: 'flex', flexFlow: 'column', gap: 2, paddingTop: 2 }}
        >
            <Box />
            {company.locations?.map((l, i) => (
                <LocationCard
                    key={'card_' + l._id}
                    index={i}
                    location={l}
                    edit={() => {
                        setState({
                            type: 'update',
                            id: l._id,
                            data: {
                                label: l.label,
                                address: !l.address
                                    ? undefined
                                    : {
                                          line_1: l.address.line_1,
                                          line_2: l.address.line_2,
                                          city: l.address.city,
                                          state: l.address.state,
                                          postal: l.address.postal,
                                          country: l.address.country,
                                      },
                            },
                        });
                    }}
                />
            ))}
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
                    onClick={() => {
                        setState({
                            type: 'create',
                            data: {
                                company: company._id,
                                label: undefined,
                                address: undefined,
                            },
                        });
                    }}
                >
                    New location
                </AppFab>
            )}
            <LocationForm
                company={company}
                state={state}
                setState={(s) => {
                    if (!s) {
                        setState(null);
                        setResult(null);
                    } else {
                        setState(s);
                    }
                }}
                result={result}
                setResult={(d) => setResult(d)}
                loading={createLoading || updateLoading}
                onSuccess={() => {
                    setResult(null);
                    setState(null);
                }}
                error={
                    result && result.success == false ? result.error : undefined
                }
                onSubmit={(val) => {
                    if (state && 'id' in state && val.type === 'update') {
                        const { type, ...variables } = val;
                        updateLocation({
                            variables,
                        });
                    } else if (
                        state &&
                        !('id' in state) &&
                        val.type == 'create'
                    ) {
                        const { type, ...variables } = val;
                        createLocation({
                            variables,
                        });
                    }
                }}
            />
        </Box>
    );
};

export default CompanyLocations;
