import { Box } from '@mui/material';
import React, { ReactElement } from 'react';

export interface NestFolderProps {
    type: 'Folder';
    label: string;
    children: NestProps;
}

export interface NestItemProps {
    type: 'Item';
    label: string;
    onClick: () => void;
}

export interface NestProps {
    children: Record<string, NestFolderProps | NestItemProps>;
}

const Nest = <T,>(props: NestProps): ReactElement => {
    const { children } = props;

    return (
        <Box>
            {Object.keys(children).map((key) => (
                <Box key={key}></Box>
            ))}
        </Box>
    );
};

export default Nest;
