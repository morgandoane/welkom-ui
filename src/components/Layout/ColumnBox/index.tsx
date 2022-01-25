import { useTheme, Box } from '@mui/material';
import React, { ReactElement } from 'react';

export interface ColumnBoxProps {
    children: {
        header?: ReactElement;
        content?: ReactElement;
        footer?: ReactElement;
    };
    animate?: boolean;
}

const ColumnBox = (props: ColumnBoxProps): ReactElement => {
    const { children, animate = false } = props;

    const [scrolled, setScrolled] = React.useState(false);

    const { transitions, palette, shadows } = useTheme();

    return (
        <Box sx={{ height: '100%', display: 'flex', flexFlow: 'column' }}>
            {children.header && (
                <Box
                    sx={
                        animate
                            ? {
                                  zIndex: 10,
                                  transition: transitions.create('all', {
                                      duration: 250,
                                  }),
                                  background:
                                      scrolled && palette.mode == 'dark'
                                          ? palette.background.paper
                                          : palette.background.default,
                                  boxShadow: scrolled ? shadows[8] : 'none',
                              }
                            : undefined
                    }
                >
                    {children.header}
                </Box>
            )}
            <Box
                onScroll={(event) => {
                    const value = event.currentTarget.scrollTop > 0;
                    if (value !== scrolled) setScrolled(value);
                }}
                sx={{ flex: 1, overflow: 'auto' }}
            >
                {children.content}
            </Box>
            {children.footer && <Box>{children.footer}</Box>}
        </Box>
    );
};

export default ColumnBox;
