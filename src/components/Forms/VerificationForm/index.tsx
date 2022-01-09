import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { VerificationStatus } from '../../../graphql/schema/Verification/Verification';
import {
    CreateVerificationInput,
    UpdateVerificationInput,
} from '../../../graphql/schema/Verification/VerificationInput';
import ButtonToggle from '../../ButtonToggle';
import FormRow from '../components/FormRow';
import TextFormField from '../components/TextFormField';
import { RiErrorWarningFill, RiShieldCheckFill } from 'react-icons/ri';
import { MdWarningAmber } from 'react-icons/md';
import { BiRadioCircle } from 'react-icons/bi';

export interface VerificationFormProps {
    value: CreateVerificationInput | UpdateVerificationInput;
    onChange: (data: CreateVerificationInput | UpdateVerificationInput) => void;
}

export const VerificationIcon = (props: {
    status: VerificationStatus | null;
    active?: boolean;
}) => {
    const { status, active = true } = props;
    const { palette } = useTheme();

    const icons: Record<VerificationStatus, ReactElement> = {
        [VerificationStatus.Problem]: (
            <MdWarningAmber
                style={{
                    color: active ? palette.error.main : undefined,
                }}
            />
        ),
        [VerificationStatus.Verified]: (
            <RiShieldCheckFill
                style={{
                    color: active ? palette.success.main : undefined,
                }}
            />
        ),
        [VerificationStatus.Warning]: (
            <RiErrorWarningFill
                style={{
                    color: active ? palette.warning.main : undefined,
                }}
            />
        ),
    };

    return (
        <Tooltip arrow title={status || 'Unverified'}>
            <Box sx={{ display: 'flex' }}>
                {status ? (
                    icons[status]
                ) : (
                    <BiRadioCircle color={palette.text.secondary} />
                )}
            </Box>
        </Tooltip>
    );
};

const VerificationForm = (props: VerificationFormProps): ReactElement => {
    const { value, onChange } = props;
    const { palette } = useTheme();

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Typography variant="caption" color="textSecondary">
                Status
            </Typography>
            <Box p={0.5} />
            <FormRow gap={3}>
                <Box sx={{ flex: 1 }}>
                    <ButtonToggle
                        value={{
                            id: value.status,
                            label: value.status,
                            icon: (
                                <VerificationIcon
                                    status={value.status}
                                    active={true}
                                />
                            ),
                        }}
                        options={Object.keys(VerificationStatus).map((key) => ({
                            id: key,
                            label: key,
                            icon: (
                                <VerificationIcon
                                    status={key as VerificationStatus}
                                    active={
                                        value.status ===
                                        (key as VerificationStatus)
                                    }
                                />
                            ),
                        }))}
                        onChange={(val) => {
                            onChange({
                                ...value,
                                status: val.id as VerificationStatus,
                            });
                        }}
                    />
                </Box>
            </FormRow>
            <FormRow gap={3}>
                <TextFormField
                    label="Notes"
                    value={value.notes || ''}
                    onChange={(val) => {
                        onChange({ ...value, notes: val || '' });
                    }}
                />
            </FormRow>
        </Box>
    );
};

export default VerificationForm;
