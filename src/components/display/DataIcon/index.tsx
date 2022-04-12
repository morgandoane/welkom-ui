import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import React, { ReactElement, ReactNode } from 'react';
import { DataIconKey, useDataIcons, DataIconSchema } from './types';

const DataIcon = <
    D extends DataIconSchema,
    K extends DataIconKey,
    V extends keyof D[K]
>(props: {
    type: K;
    children: V;
}): ReactElement => {
    const { type, children: value } = props;

    const DataIcons = useDataIcons();

    const { node, label } = DataIcons[type][value] as unknown as {
        node: ReactNode;
        label: string;
    };

    return (
        <React.Fragment>
            <Tooltip title={label}>
                <Box sx={{ display: 'flex' }}>{node}</Box>
            </Tooltip>
        </React.Fragment>
    );
};

export default DataIcon;
