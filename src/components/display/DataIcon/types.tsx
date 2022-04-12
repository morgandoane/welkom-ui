import React from 'react';
import { MdCheck, MdRadioButtonUnchecked, MdRefresh } from 'react-icons/md';
import { FiAlertTriangle } from 'react-icons/fi';
import { ReactNode } from 'react';
import { ItineraryStatus } from '../../../graphql/schema/Itinerary/ItineraryStatus';
import { useTheme } from '@mui/material/';

export type DataIconKey = 'Itinerary';

export type DataIconSchema = Record<
    DataIconKey,
    Record<ItineraryStatus, { node: ReactNode; label: string }>
>;

export const useDataIcons = (): DataIconSchema => {
    const { palette } = useTheme();
    return {
        Itinerary: {
            [ItineraryStatus.Complete]: {
                node: (
                    <MdCheck
                        style={{
                            fontSize: '1.5rem',
                            color: palette.success.main,
                        }}
                    />
                ),
                label: 'Complete',
            },
            [ItineraryStatus.InProgress]: {
                node: (
                    <MdRefresh
                        style={{
                            fontSize: '1.5rem',
                            color: palette.primary.main,
                        }}
                    />
                ),
                label: 'In Progress',
            },
            [ItineraryStatus.Incomplete]: {
                node: (
                    <FiAlertTriangle
                        style={{
                            fontSize: '1.5rem',
                            color: palette.warning.main,
                        }}
                    />
                ),
                label: 'Needs info',
            },
            [ItineraryStatus.Pending]: {
                node: (
                    <MdRadioButtonUnchecked
                        style={{
                            fontSize: '1.5rem',
                            color: palette.text.secondary,
                        }}
                    />
                ),
                label: 'Pending',
            },
        },
    };
};
