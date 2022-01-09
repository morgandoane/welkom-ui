import { Box, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdChevronRight, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useBol } from '../../graphql/queries/bols/useBol';
import { dateFormats } from '../../utils/dateFormats';
import Message from '../Message';

export interface BolPreviewProps {
    id: string;
}

const BolPreview = (props: BolPreviewProps): ReactElement => {
    const { id } = props;
    const nav = useNavigate();

    const { data, error, loading } = useBol({
        variables: {
            id,
        },
        skip: !id || id == '',
    });

    const bol = data ? data.bol : null;

    return (
        <Box sx={{ minWidth: 340 }}>
            {loading ? (
                <Message type="Loading" />
            ) : error ? (
                <Message type="Warning" />
            ) : bol ? (
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6">{bol.code}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                From
                            </Typography>
                            <Typography>
                                {bol.from.company.name +
                                    (bol.from.location
                                        ? ` (${
                                              bol.from.location.label ||
                                              bol.from.location.address?.city
                                          })`
                                        : '')}
                            </Typography>
                            <Typography variant="body2">
                                {format(
                                    new Date(bol.from.date),
                                    dateFormats.condensedDate
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                padding: 2,
                                fontSize: '2rem',
                            }}
                        >
                            <MdChevronRight />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                To
                            </Typography>
                            <Typography>
                                {bol.to.company.name +
                                    (bol.to.location
                                        ? ` (${
                                              bol.to.location.label ||
                                              bol.to.location.address?.city
                                          })`
                                        : '')}
                            </Typography>
                            <Typography variant="body2">
                                {format(
                                    new Date(bol.to.date),
                                    dateFormats.condensedDate
                                )}
                            </Typography>
                        </Box>
                    </Box>
                    <Box p={0.5} />
                    <Typography variant="caption" color="textSecondary">
                        Contents
                    </Typography>
                    {bol.contents.length == 0 && <Typography>None</Typography>}
                    <Box>
                        {bol.contents.map((content, i) => (
                            <Typography key={'bol_' + bol._id + 'content_' + i}>
                                {`${content.item.english} - ${
                                    content.quantity
                                } ${
                                    content.unit[
                                        content.quantity == 1
                                            ? 'english'
                                            : 'english_plural'
                                    ]
                                }`}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ paddingTop: 2 }}>
                        <Button
                            endIcon={<MdEdit />}
                            onClick={() =>
                                nav(
                                    `itineraries/${bol.itinerary._id}/bols/${bol._id}`
                                )
                            }
                        >
                            Edit BOL
                        </Button>
                    </Box>
                </Box>
            ) : (
                ''
            )}
        </Box>
    );
};

export default BolPreview;
