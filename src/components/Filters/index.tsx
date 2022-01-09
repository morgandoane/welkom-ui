import {
    FormControlLabel,
    Checkbox,
    Collapse,
    Switch,
    useTheme,
    Box,
} from '@mui/material';
import React, { ReactElement } from 'react';

export interface FiltersProps {
    children: Record<
        string,
        [
            element: ReactElement,
            checked: boolean,
            onCheck: (val: boolean) => void
        ]
    >;
}

const Filters = (props: FiltersProps): ReactElement => {
    const { children } = props;
    const {
        palette: { divider },
    } = useTheme();

    return (
        <Box>
            {Object.keys(children).map((key) => (
                <Box
                    key={'filter_' + key}
                    sx={{
                        display: 'flex',
                        gap: 4,
                        borderBottom: `1px solid ${divider}`,
                        alignItems: 'center',
                        paddingTop: 1,
                        paddingBottom: 1,
                    }}
                >
                    <Box sx={{ flex: 1, maxWidth: 200 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    onClick={() =>
                                        children[key][2](!children[key][1])
                                    }
                                    checked={children[key][1]}
                                />
                            }
                            label={key}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Collapse in={children[key][1]}>
                            {children[key][0]}
                        </Collapse>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Filters;
