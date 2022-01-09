import { Box, Typography } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import { chunkify } from '../../utils/chunkify';
import FormRow from '../Forms/components/FormRow';
import { uuid } from 'uuidv4';

export interface DetailsProps {
    children: {
        key: string;
        value: number | string | ReactNode | ReactElement;
    }[];
    gap?: number;
    bold?: boolean;
}

const Details = (props: DetailsProps): ReactElement => {
    const { children, gap = 2, bold = true } = props;

    const grouped = chunkify(children, children.length > 3 ? 2 : 1);

    return (
        <Box sx={{ maxWidth: 600 }}>
            {grouped.map((group) => (
                <FormRow gap={gap} key={uuid()}>
                    {group.map(({ key, value }) => (
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexFlow: 'column',
                            }}
                            key={uuid()}
                        >
                            <Typography variant="caption" color="textSecondary">
                                {key}
                            </Typography>
                            <Typography
                                fontWeight={bold ? 500 : undefined}
                                variant="body1"
                                color="textPrimary"
                            >
                                {value}
                            </Typography>
                        </Box>
                    ))}
                </FormRow>
            ))}
        </Box>
    );
};

export default Details;
