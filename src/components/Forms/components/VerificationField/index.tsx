import {
    IconButton,
    InputAdornment,
    ListItemIcon,
    MenuItem,
    TextField,
    useTheme,
    Box,
} from '@mui/material';
import React, { ReactElement } from 'react';
import {
    MdCheckCircleOutline,
    MdClear,
    MdOutlineRadioButtonUnchecked,
} from 'react-icons/md';
import { VerificationStatus } from '../../../../graphql/schema/Verification/Verification';
import { getVerificationIcons } from '../../VerificationForm';

export interface VerificationFieldProps {
    naked?: boolean;
    label?: string;
    value?: VerificationStatus | null;
    onChange: (value: VerificationStatus | null | undefined) => void;
}

const VerificationField = (props: VerificationFieldProps): ReactElement => {
    const { naked = false, label = 'Verification', value, onChange } = props;

    const theme = useTheme();

    const icons = getVerificationIcons(theme);

    return (
        <TextField
            sx={{
                '&.MuiSelect-icon': {
                    display: 'none !important',
                },
            }}
            InputProps={{
                ...(naked ? { disableUnderline: true } : {}),
                endAdornment: (
                    <InputAdornment position="end">
                        <Box sx={{ display: 'flex', paddingRight: 4 }}>
                            <IconButton onClick={() => onChange(undefined)}>
                                <MdClear />
                            </IconButton>
                        </Box>
                    </InputAdornment>
                ),
                sx: {
                    color:
                        value === undefined
                            ? { color: theme.palette.text.disabled }
                            : undefined,
                },
            }}
            variant={naked ? 'standard' : 'filled'}
            fullWidth
            value={value === null ? '_' : value === undefined ? '_un' : value}
            select
            onChange={(e) =>
                onChange(
                    !e.target.value
                        ? undefined
                        : e.target.value === '_'
                        ? null
                        : e.target.value === '_un'
                        ? undefined
                        : (e.target.value as VerificationStatus)
                )
            }
            placeholder="Stuff"
        >
            <MenuItem value={'_un'} disabled>
                Verification
            </MenuItem>
            {Object.keys(VerificationStatus).map((status) => (
                <MenuItem value={status} key={'s_' + status}>
                    <ListItemIcon>
                        {icons[status as VerificationStatus]}
                    </ListItemIcon>
                    {status}
                </MenuItem>
            ))}
            <MenuItem selected={value === null} value={'_'}>
                <ListItemIcon>
                    <MdOutlineRadioButtonUnchecked />
                </ListItemIcon>
                Unverified
            </MenuItem>
        </TextField>
    );
};

export default VerificationField;
