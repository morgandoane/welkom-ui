import { LoadingButton } from '@mui/lab';
import { Button, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { RiShieldCheckFill } from 'react-icons/ri';
import AuthGuy from '../../../../../../../../auth/components/AuthGuy';
import { UiPermission } from '../../../../../../../../auth/UiPermission';
import usePermissions from '../../../../../../../../auth/usePermissions';
import { UserRole } from '../../../../../../../../auth/UserRole';
import VerificationForm from '../../../../../../../../components/Forms/VerificationForm';
import Message from '../../../../../../../../components/Message';
import VerificationPreview from '../../../../../../../../components/VerificationPreview';
import {
    CreateFulfillmentVerificationRes,
    useFulfillmentVerificationCreation,
} from '../../../../../../../../graphql/mutations/fulfillment/useFulfillmentVerificationCreation';
import {
    UpdateVericationRes,
    useVerificationUpdate,
} from '../../../../../../../../graphql/mutations/verification/useVerificationUpdate';
import { FulfillmentQuery } from '../../../../../../../../graphql/queries/fulfillment/useFulfillment';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { VerificationStatus } from '../../../../../../../../graphql/schema/Verification/Verification';
import {
    CreateVerificationInput,
    UpdateVerificationInput,
} from '../../../../../../../../graphql/schema/Verification/VerificationInput';
import { OperationResult } from '../../../../../../../../graphql/types';

export interface FulfillmentVerificationProps {
    fulfillment: Fulfillment;
}

export const FulfillmentVerification = (
    props: FulfillmentVerificationProps
): ReactElement => {
    const { fulfillment } = props;
    const { verification } = fulfillment;

    const { roles } = usePermissions();

    const [state, setState] = React.useState<
        | null
        | ({ _type: 'create' } & CreateVerificationInput)
        | ({ _type: 'update' } & UpdateVerificationInput)
    >(null);

    const [result, setResult] = React.useState<null | OperationResult<
        UpdateVericationRes | CreateFulfillmentVerificationRes
    >>(null);

    const [create, { loading: createLoading }] =
        useFulfillmentVerificationCreation({
            onCompleted: (data) => setResult({ success: true, data }),
            onError: (error) => setResult({ success: false, error }),
            variables:
                state && state._type === 'create'
                    ? {
                          id: fulfillment._id,
                          data: {
                              status: state.status,
                              notes: state.notes,
                          },
                      }
                    : undefined,
        });

    const [update, { loading: updateLoading }] = useVerificationUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [FulfillmentQuery],
        variables:
            state && state._type === 'update' && verification
                ? {
                      id: verification._id,
                      data: {
                          status: state.status,
                          notes: state.notes,
                          deleted: state.deleted,
                      },
                  }
                : undefined,
    });

    const submit = () => {
        if (state) {
            if (state._type === 'create') create();
            else update();
        }
    };

    const getHoldup = (): string | null => {
        if (state) {
            if (state.status !== VerificationStatus.Verified && !state.notes)
                return 'Please enter a note.';
        }
        return null;
    };

    const holdup = getHoldup();

    return (
        <Box sx={{ paddingTop: 3 }}>
            {result && result.success ? (
                <Message
                    type="Success"
                    message={
                        'verifyFulfillment' in result.data
                            ? 'Verification saved!'
                            : result.data.updateVerification.deleted
                            ? 'Verification removed'
                            : 'Verification updated!'
                    }
                    onComplete={() => {
                        setResult(null);
                        setState(null);
                    }}
                />
            ) : result ? (
                <Message
                    type="Warning"
                    message={result.error.message}
                    action={
                        <Button onClick={() => setResult(null)}>
                            Try again
                        </Button>
                    }
                />
            ) : state ? (
                <Box>
                    <VerificationForm
                        value={state}
                        onChange={(val) => setState({ ...state, ...val })}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <LoadingButton
                            loading={updateLoading || createLoading}
                            onClick={() => setState(null)}
                            variant="outlined"
                            color="inherit"
                        >
                            Cancel
                        </LoadingButton>
                        <Tooltip title={holdup || ''} arrow>
                            <Box>
                                <LoadingButton
                                    disabled={Boolean(holdup)}
                                    loading={updateLoading || createLoading}
                                    variant="contained"
                                    onClick={submit}
                                >
                                    Save
                                </LoadingButton>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            ) : verification ? (
                <Box sx={{ maxWidth: 550 }}>
                    <VerificationPreview
                        verification={verification}
                        onEdit={() => {
                            setState({
                                _type: 'update',
                                status: verification.status,
                                notes: verification.notes,
                            });
                        }}
                        onDelete={() =>
                            update({
                                variables: {
                                    id: verification._id,
                                    data: {
                                        deleted: true,
                                        status: verification.status,
                                    },
                                },
                            })
                        }
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        gap: 2,
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography>{`This ${fulfillment.type.toLowerCase()} has not been verified.`}</Typography>
                    <AuthGuy permission={UiPermission.WarehouseVerification}>
                        <Button
                            onClick={() =>
                                setState({
                                    _type: 'create',
                                    status: VerificationStatus.Verified,
                                })
                            }
                            startIcon={<RiShieldCheckFill />}
                        >
                            Verify now
                        </Button>
                    </AuthGuy>
                </Box>
            )}
            {roles.includes(UserRole.Admin) && (
                <Box sx={{ paddingTop: 4 }}>
                    <Typography variant="h6" sx={{ paddingBottom: 1 }}>
                        Signatures
                    </Typography>
                    {fulfillment.bol.signatures.map((sig, i) => (
                        <Box key={'sig_' + i}>
                            <Typography>{sig.profile.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {sig.fulfillment_type}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FulfillmentVerification;
