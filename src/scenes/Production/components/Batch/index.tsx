import {
    Avatar,
    Box,
    Button,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Typography,
    useTheme,
} from '@mui/material';
import { differenceInMinutes, format } from 'date-fns';
import React, { ReactElement } from 'react';
import { BiTime } from 'react-icons/bi';
import { MdCalendarToday, MdChevronLeft, MdLock } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import RecipeVersionPreview from '../../../../components/RecipeVersionPreview';
import TabFade from '../../../../components/TabFade';
import { useBatch } from '../../../../graphql/queries/batch/useBatch';
import { FulfillmentType } from '../../../../graphql/schema/Fulfillment/Fulfillment';
import { Lot } from '../../../../graphql/schema/Lot/Lot';
import { dateFormats } from '../../../../utils/dateFormats';

const Batch = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { palette } = useTheme();

    const [focused, setFocused] = React.useState<{
        lot: Lot;
        element: Element;
    } | null>(null);

    const [closing, setClosing] = React.useState(false);

    React.useEffect(() => {
        if (closing) {
            const timeout = setTimeout(() => {
                setClosing(false);
                setFocused(null);
            }, 250);
        }
    }, [closing]);

    const { data, error, loading } = useBatch({
        variables: { id: id || '' },
    });

    const batch = data ? data.batch : null;

    return (
        <AppNav error={error} loading={loading}>
            {batch && (
                <ColumnBox>
                    {{
                        header: (
                            <Box>
                                <Button
                                    onClick={() =>
                                        nav('/production/batchreports')
                                    }
                                    variant="text"
                                    color="inherit"
                                    startIcon={<MdChevronLeft />}
                                >
                                    Batch reports
                                </Button>
                                <PageTitle>Batch Report</PageTitle>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Contents: (
                                        <Box
                                            p={3}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{ flex: 1, maxWidth: 800 }}
                                            >
                                                <RecipeVersionPreview
                                                    version={{
                                                        ...batch.recipe_version,
                                                        sections:
                                                            batch.recipe_version.sections.map(
                                                                (s) => ({
                                                                    ...s,
                                                                    steps: s.steps.map(
                                                                        (
                                                                            step
                                                                        ) => {
                                                                            const matchingLots =
                                                                                batch.lot.contents.filter(
                                                                                    (
                                                                                        c
                                                                                    ) =>
                                                                                        c.recipe_step &&
                                                                                        c
                                                                                            .recipe_step
                                                                                            ._id ==
                                                                                            step._id
                                                                                );
                                                                            if (
                                                                                matchingLots.length ==
                                                                                0
                                                                            )
                                                                                return step;
                                                                            else
                                                                                return {
                                                                                    ...step,
                                                                                    element:
                                                                                        (
                                                                                            <Box
                                                                                                sx={{
                                                                                                    display:
                                                                                                        'flex',
                                                                                                    gap: 1,
                                                                                                }}
                                                                                            >
                                                                                                {matchingLots.map(
                                                                                                    (
                                                                                                        content
                                                                                                    ) => (
                                                                                                        <Chip
                                                                                                            onClick={(
                                                                                                                e
                                                                                                            ) => {
                                                                                                                setFocused(
                                                                                                                    {
                                                                                                                        lot: content.lot,
                                                                                                                        element:
                                                                                                                            e.currentTarget,
                                                                                                                    }
                                                                                                                );
                                                                                                            }}
                                                                                                            key={
                                                                                                                content
                                                                                                                    .lot
                                                                                                                    ._id
                                                                                                            }
                                                                                                            label={
                                                                                                                content
                                                                                                                    .lot
                                                                                                                    .code
                                                                                                            }
                                                                                                        />
                                                                                                    )
                                                                                                )}
                                                                                            </Box>
                                                                                        ),
                                                                                };
                                                                        }
                                                                    ),
                                                                })
                                                            ),
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    ),
                                    Details: (
                                        <Box>
                                            <List>
                                                <ListItem divider>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={
                                                                batch.created_by
                                                                    .picture
                                                            }
                                                            alt={
                                                                batch.created_by
                                                                    .name
                                                            }
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            batch.created_by
                                                                .name
                                                        }
                                                        secondary="Mixer"
                                                    />
                                                </ListItem>
                                                <ListItem divider>
                                                    <ListItemAvatar>
                                                        <MdCalendarToday
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                                color: palette
                                                                    .text
                                                                    .disabled,
                                                            }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                {format(
                                                                    new Date(
                                                                        batch.date_created
                                                                    ),
                                                                    dateFormats.condensedDate +
                                                                        ' ' +
                                                                        dateFormats.time
                                                                )}
                                                            </Box>
                                                        }
                                                        secondary="Date mixed"
                                                    />
                                                </ListItem>
                                                <ListItem divider>
                                                    <ListItemAvatar>
                                                        <BiTime
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                                color: palette
                                                                    .text
                                                                    .disabled,
                                                            }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            batch.date_completed
                                                                ? `${differenceInMinutes(
                                                                      new Date(
                                                                          batch.date_completed
                                                                      ),
                                                                      new Date(
                                                                          batch.date_created
                                                                      )
                                                                  )} minute${
                                                                      differenceInMinutes(
                                                                          new Date(
                                                                              batch.date_completed
                                                                          ),
                                                                          new Date(
                                                                              batch.date_created
                                                                          )
                                                                      ) == 1
                                                                          ? ''
                                                                          : 's'
                                                                  }`
                                                                : 'Not complete yet'
                                                        }
                                                        secondary="Batch duration"
                                                    />
                                                </ListItem>
                                            </List>
                                        </Box>
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </ColumnBox>
            )}
            <Popover
                open={Boolean(focused) && !closing}
                onClose={() => setClosing(true)}
                anchorEl={focused ? focused.element : null}
            >
                {focused && (
                    <Box p={2}>
                        <Typography variant="h6">{focused.lot.code}</Typography>
                        <Typography>{focused.lot.item.english}</Typography>
                        {focused.lot.location && (
                            <Typography>
                                {focused.lot.location.label ||
                                    focused.lot.location.address?.city ||
                                    ''}
                            </Typography>
                        )}
                        {focused.lot.company && (
                            <Typography>{focused.lot.company.name}</Typography>
                        )}
                    </Box>
                )}
            </Popover>
        </AppNav>
    );
};

export default Batch;
