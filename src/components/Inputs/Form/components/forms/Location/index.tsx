import { LoadingButton } from '@mui/lab';
import {
    Box,
    TextField,
    Tooltip,
    Typography,
    FormControlLabel,
    Switch,
    Collapse,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
    CreateLocationArgs,
    UpdateLocationArgs,
} from '../../../../../../graphql/mutationArgs';
import { useCompany } from '../../../../../../graphql/schema/Company/useCompany';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import { EntityFormProps } from '../../AppForm';

const LocationFormRender = (
    props: EntityFormProps<CreateLocationArgs, UpdateLocationArgs>
): ReactElement => {
    const nav = useNavigate();
    const { company_id } = useParams();
    const { loading, value, onChange, submit } = props;

    const {
        data,
        error,
        loading: companyLoading,
    } = useCompany({
        variables: {
            id: company_id || '',
        },
    });

    const company = data ? data.company : null;

    const getHoldup = (): string | null => {
        if (!value.data.label)
            return 'Please provide a name for this location.';

        if (value.data.address) {
            if (!value.data.address.line_1)
                return 'Please enter Line 1 for address.';
            if (!value.data.address.city)
                return 'Please enter City for address.';
            if (!value.data.address.state)
                return 'Please enter State for address.';
            if (!value.data.address.postal)
                return 'Please enter Postal for address.';
        }
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
                            {company && (
                                <BackButton
                                    onClick={() => {
                                        nav(
                                            `/library/companies/${company._id}`
                                        );
                                    }}
                                >
                                    {company.name}
                                </BackButton>
                            )}
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Location'
                                : 'Update Location'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 500 }}>
                        <FormRow p={3}>
                            <TextField
                                required
                                fullWidth
                                label="Location name"
                                value={value.data.label}
                                onChange={(e) => {
                                    if (value._type == 'create') {
                                        onChange({
                                            ...value,
                                            data: {
                                                ...value.data,
                                                label: e.target.value,
                                            },
                                        });
                                    } else {
                                        onChange({
                                            ...value,
                                            data: {
                                                ...value.data,
                                                label: e.target.value,
                                            },
                                        });
                                    }
                                }}
                            />
                        </FormRow>
                        <FormRow p={3}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            value.data.address !== undefined &&
                                            value.data.address !== null
                                        }
                                        onChange={(e, checked) => {
                                            if (value._type == 'create') {
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        address: !checked
                                                            ? undefined
                                                            : {
                                                                  line_1: '',
                                                                  city: '',
                                                                  state: '',
                                                                  postal: '',
                                                                  country: '',
                                                              },
                                                    },
                                                });
                                            } else {
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        address: !checked
                                                            ? undefined
                                                            : {
                                                                  line_1: '',
                                                                  city: '',
                                                                  state: '',
                                                                  postal: '',
                                                                  country: '',
                                                              },
                                                    },
                                                });
                                            }
                                        }}
                                    />
                                }
                                label="Has address"
                            />
                        </FormRow>
                        <Collapse
                            in={
                                value.data.address !== undefined &&
                                value.data.address !== null
                            }
                        >
                            <Box>
                                <FormRow p={3}>
                                    <TextField
                                        fullWidth
                                        label="Line 1"
                                        value={value.data.address?.line_1}
                                        required
                                        onChange={(e) => {
                                            if (value.data.address) {
                                                if (value._type == 'create') {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                line_1:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                } else {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                line_1:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                </FormRow>
                                <FormRow p={3}>
                                    <TextField
                                        fullWidth
                                        label="Line 2"
                                        value={value.data.address?.line_2}
                                        onChange={(e) => {
                                            if (value.data.address) {
                                                if (value._type == 'create') {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                line_2:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                } else {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                line_2:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                </FormRow>
                                <FormRow p={3}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        value={value.data.address?.city}
                                        required
                                        onChange={(e) => {
                                            if (value.data.address) {
                                                if (value._type == 'create') {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                city:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                } else {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                city:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="State"
                                        value={value.data.address?.state}
                                        required
                                        onChange={(e) => {
                                            if (value.data.address) {
                                                if (value._type == 'create') {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                state:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                } else {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                state:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Postal"
                                        value={value.data.address?.postal}
                                        required
                                        onChange={(e) => {
                                            if (value.data.address) {
                                                if (value._type == 'create') {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                postal:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                } else {
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            address: {
                                                                ...value.data
                                                                    .address,
                                                                postal:
                                                                    e.target
                                                                        .value ||
                                                                    '',
                                                            },
                                                        },
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                </FormRow>
                            </Box>
                        </Collapse>
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
                                    Delete location
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default LocationFormRender;
