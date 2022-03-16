import { useTheme } from '@mui/material/';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { ReactNode, ReactElement } from 'react';

export interface DateBoxProps {
    children: undefined | string | [string, string];
    size?: number;
    color?: string;
    secondaryColor?: string;
    background?: string;
}

const DateBox = (props: DateBoxProps): ReactElement => {
    const { palette, shape } = useTheme();
    const {
        children,
        size = 60,
        color = palette.text.primary,
        secondaryColor = palette.text.secondary,
        background = palette.background.default,
    } = props;

    const thinness = 18;

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column',
                height: size + size / thinness,
                width: size,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        background: secondaryColor,
                        height: size / thinness,
                        width: size / thinness,
                    }}
                />
                <Box sx={{ width: `${size * 0.5}px` }} />
                <Box
                    sx={{
                        background: secondaryColor,
                        height: size / thinness,
                        width: size / thinness,
                    }}
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    borderRadius: size / thinness,
                    background: secondaryColor,
                    display: 'flex',
                    flexFlow: 'column',
                    padding: `${size / thinness}px`,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        background,
                        marginTop: `${size * 0.2}px`,
                        borderBottomLeftRadius: size / thinness,
                        borderBottomRightRadius: size / thinness,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {children instanceof Array ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography color="textSecondary" variant="caption">
                                {children[0]}
                            </Typography>
                            <Typography sx={{ marginTop: -0.75 }}>
                                {children[1]}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography>{children}</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default DateBox;
