import {
    Box,
    Button,
    ClickAwayListener,
    Dialog,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { PalletConfigurationInput } from '../../../../../../graphql/inputsTypes';
import FocusLine from '../../../../../feedback/FocusLine';
import { MdAdd, MdClear } from 'react-icons/md';
import { cloneDeep } from '@apollo/client/utilities';
import { BsQuestionCircle } from 'react-icons/bs';

export interface PalletConfigurationProps {
    value: PalletConfigurationInput[];
    onChange: (value: PalletConfigurationInput[]) => void;
}

const PalletConfiguration = (props: PalletConfigurationProps): ReactElement => {
    const { value, onChange } = props;

    const { palette, shape } = useTheme();

    const [focused, setFocused] = React.useState(false);

    const [help, setHelp] = React.useState(false);

    return (
        <React.Fragment>
            <ClickAwayListener onClickAway={() => setFocused(false)}>
                <Box
                    sx={{
                        ...shape,
                        border: `1px solid ${palette.divider}`,
                        flex: 1,
                    }}
                    onClick={() => setFocused(true)}
                >
                    <Box
                        sx={{
                            p: 2,
                            background:
                                palette.mode == 'dark'
                                    ? palette.background.paper
                                    : palette.action.selected,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>Pallet Configuration</Typography>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setHelp(true);
                            }}
                        >
                            <BsQuestionCircle />
                        </IconButton>
                    </Box>
                    <FocusLine focused={focused} />
                    {value.map((config, index) => (
                        <Box
                            key={'config_' + index}
                            sx={{
                                p: 1,
                                paddingLeft: 2,
                                paddingRight: 2,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                placeholder="Name"
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                value={config.name}
                                onChange={(e) => {
                                    const parsed = parseFloat(e.target.value);
                                    const copy = cloneDeep(value);
                                    copy[index].name = e.target.value || '';
                                    onChange(copy);
                                }}
                            />
                            <TextField
                                placeholder="Capacity"
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                value={
                                    config.capacity == null
                                        ? ''
                                        : config.capacity
                                }
                                onChange={(e) => {
                                    const parsed = parseFloat(e.target.value);
                                    const copy = cloneDeep(value);
                                    copy[index].capacity = isNaN(parsed)
                                        ? null
                                        : parsed;
                                    onChange(copy);
                                }}
                            />
                            {value.length > 1 && (
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        const copy = cloneDeep(value);
                                        copy.splice(index, 1);
                                        onChange(copy);
                                    }}
                                >
                                    <MdClear />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                    <Box sx={{ p: 1 }}>
                        <Box>
                            <Button
                                onClick={() =>
                                    onChange([
                                        ...value,
                                        { name: '', capacity: null },
                                    ])
                                }
                                variant="text"
                                startIcon={<MdAdd />}
                            >
                                Add configuration
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </ClickAwayListener>
            <Dialog
                maxWidth="sm"
                fullWidth
                open={help}
                onClose={() => setHelp(false)}
                PaperProps={{ sx: { p: 2 } }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6" sx={{ paddingRight: 6 }}>
                        Pallet Configuration
                    </Typography>
                    <IconButton onClick={() => setHelp(false)}>
                        <MdClear />
                    </IconButton>
                </Box>
                <Box p={1} />
                <Typography>
                    Each item in the library must have at least 1 pallet
                    configuration. A pallet configuration is simply an option
                    for how many items can fit onto one pallet.
                </Typography>
                <Box p={1} />
                <Typography>
                    This is used to help determine transportation and
                    procurement costs.
                </Typography>
            </Dialog>
        </React.Fragment>
    );
};

export default PalletConfiguration;
