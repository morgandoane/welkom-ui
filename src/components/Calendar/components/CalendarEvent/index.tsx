import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { EventProps } from '../..';

export interface CalendarEventProps<T> {
    children: EventProps<T>;
}

const CalendarEvent = <T,>(props: CalendarEventProps<T>): ReactElement => {
    const {
        id,
        icon,
        primary,
        secondary,
        event: calendar_event,
        onClick,
    } = props.children;

    const { palette } = useTheme();

    return (
        <Button
            sx={{
                background: palette.background.paper,
                justifyContent: 'flex-start',
                paddingLeft: 1,
            }}
            fullWidth
            size="small"
            variant="text"
            color="inherit"
            startIcon={icon}
            onClick={(event) => {
                if (onClick) onClick(calendar_event, event);
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Typography variant="body2">{primary}</Typography>
                <Typography variant="caption" color="textSecondary">
                    {secondary}
                </Typography>
            </Box>
        </Button>
    );
};

export default CalendarEvent;
