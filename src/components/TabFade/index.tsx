import { Box, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { ReactElement } from 'react';
import ViewFade from '../ViewFade';
import { uuid } from 'uuidv4';

export interface TabFadeProps {
    children: Record<string, ReactElement>;
    action?: ReactElement;
}

const TabFade = (props: TabFadeProps): ReactElement => {
    const theme = useTheme();
    const { children, action } = props;

    const [active, setActive] = React.useState(0);

    return (
        <Box
            sx={{
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexFlow: 'column',
            }}
        >
            <Box
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Tabs value={active}>
                    {Object.keys(children).map((key, index) => (
                        <Tab
                            key={uuid()}
                            label={key}
                            onClick={() => setActive(index)}
                        />
                    ))}
                </Tabs>
                <Box>{action}</Box>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <ViewFade index={active}>{Object.values(children)}</ViewFade>
            </Box>
        </Box>
    );
};

export default TabFade;
