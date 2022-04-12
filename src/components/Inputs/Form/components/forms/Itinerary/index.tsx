import { useLazyQuery } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete, MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
    CodeType,
    CodeQuery,
} from '../../../../../../graphql/schema/Code/useCode';
import { TinyCompany } from '../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../graphql/schema/Company/useCompanies';
import { CreateItineraryInput } from '../../../../../../graphql/schema/Itinerary/CreateItineraryInput';
import { UpdateItineraryInput } from '../../../../../../graphql/schema/Itinerary/UpdateItineraryInput';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import EntityField from '../../../../EntityField';
import { EntityFormProps } from '../../AppForm';

const ItineraryFormRender = (
    props: EntityFormProps<
        { data: CreateItineraryInput },
        { id: string; data: UpdateItineraryInput }
    >
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const [getCode, { loading: codeLoading, error: codeError }] = useLazyQuery<
        { code: string },
        { type: CodeType }
    >(CodeQuery, {
        variables: {
            type: CodeType.ITIN,
        },
        onCompleted: (data) => {
            if (value._type == 'create')
                onChange({
                    ...value,
                    data: {
                        ...value.data,
                        code: data.code,
                    },
                });
            else
                onChange({
                    ...value,
                    data: {
                        ...value.data,
                        code: data.code,
                    },
                });
        },
    });

    const getHoldup = (): string | null => {
        return null;
    };

    const holdup = getHoldup();

    return (
        <NavContent>
            {{
                header: (
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            gap: 1,
                        }}
                    >
                        <Box>
                            <BackButton
                                onClick={() => {
                                    if (value._type == 'create') {
                                        nav(`/supplychain/itineraries`);
                                    } else {
                                        nav(
                                            `/supplychain/itineraries/${value.id}`
                                        );
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Itinerary profile'
                                    : 'Itineraries'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Itinerary'
                                : 'Update Itinerary'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 800 }}>
                        <Box sx={{ maxWidth: 400 }}>
                            <FormRow p={3}>
                                <TextField
                                    error={Boolean(codeError)}
                                    helperText={
                                        codeError ? codeError.message : ''
                                    }
                                    label="Pro #"
                                    value={value.data.code || ''}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    code: e.target.value,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    code: e.target.value,
                                                },
                                            });
                                    }}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {codeLoading ? (
                                                    <CircularProgress
                                                        size={20}
                                                    />
                                                ) : (
                                                    <IconButton
                                                        onClick={() =>
                                                            getCode()
                                                        }
                                                    >
                                                        <MdRefresh />
                                                    </IconButton>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <EntityField
                                    fullWidth
                                    label="Carrier"
                                    variables={{
                                        filter: { skip: 0, take: 100 },
                                    }}
                                    hook={useCompanies}
                                    getData={(res) => res.companies.items}
                                    getProps={(company: TinyCompany) => ({
                                        id: company._id,
                                        label: company.name,
                                    })}
                                    value={value.data.carrier || ''}
                                    onChange={(carrier) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    carrier,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    carrier,
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                        </Box>
                        <FormRow>
                            <Box>
                                <Tooltip title={holdup || ''} arrow>
                                    <Box>
                                        <LoadingButton
                                            onClick={() => submit()}
                                            variant="contained"
                                            disabled={Boolean(holdup)}
                                            endIcon={<MdCheck />}
                                            loading={loading}
                                        >
                                            Save
                                        </LoadingButton>
                                    </Box>
                                </Tooltip>
                            </Box>
                            {value._type == 'update' && (
                                <CarefullButton
                                    endIcon={<MdDelete />}
                                    onClick={() => {
                                        submit(true);
                                    }}
                                >
                                    Delete itinerary
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default ItineraryFormRender;
