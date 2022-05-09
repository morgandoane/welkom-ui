import { Box, Tooltip, useTheme } from '@mui/material';
import { isBefore, setSeconds, startOfDay } from 'date-fns';
import React, { ReactElement } from 'react';
import {
    MdCheckCircle,
    MdDownloading,
    MdRadioButtonUnchecked,
    MdWarning,
} from 'react-icons/md';
import { TinyBol } from '../../graphql/queries/bols/useTinyBols';
import { Bol } from '../../graphql/schema/Bol/Bol';

export interface BolIconProps {
    bol: TinyBol | Bol;
    view: 'receiving' | 'shipping';
}

const BolIcon = (props: BolIconProps): ReactElement => {
    const { bol, view } = props;

    const { palette } = useTheme();

    const { status, from, to } = bol;

    const bolIcons: Record<BolStatus, ReactElement> = {
        [BolStatus.Complete]: (
            <Box
                sx={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    color: palette.success.main,
                }}
            >
                <MdCheckCircle />
            </Box>
        ),
        [BolStatus.Partial]: (
            <Box
                sx={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    color: palette.primary.main,
                }}
            >
                <MdDownloading />
            </Box>
        ),
        [BolStatus.Pending]: (
            <Box
                sx={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    color: palette.text.disabled,
                }}
            >
                <MdRadioButtonUnchecked />
            </Box>
        ),
    };

    const lateIcon = (
        <Box
            sx={{
                display: 'flex',
                fontSize: '1.5rem',
                color: palette.error.main,
            }}
        >
            <MdWarning />
        </Box>
    );

    const isLate = (): boolean => {
        const appointment = view == 'receiving' ? to : from;
        const date = new Date(appointment.date);
        const today = startOfDay(new Date());
        const late = isBefore(date, today) && bol.status == BolStatus.Pending;
        return late;
    };

    const late = isLate();

    return (
        <Tooltip arrow title={late ? 'Late' : bol.status}>
            <Box sx={{ display: 'flex' }}>
                {late ? lateIcon : bolIcons[bol.status]}
            </Box>
        </Tooltip>
    );
};

export default BolIcon;
