import {
    Avatar,
    Button,
    ButtonBase,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../components/AppFab';
import AppNav from '../../../../../../components/AppNav';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import ResponsiveDialog from '../../../../../../components/ResponsiveDialog';
import TabFade from '../../../../../../components/TabFade';
import { useTinyLocations } from '../../../../../../graphql/queries/locations/useTinyLocations';
import { useMixingCards } from '../../../../../../graphql/queries/mixingCards/useMixingCards';
import MixingLinePopover, {
    MixingLinePopoverProps,
} from './components/MixingLinePopover';

const MixingBoard = (): ReactElement => {
    const nav = useNavigate();
    const {
        data: locationsData,
        loading: locationsLoading,
        error: locationsError,
    } = useTinyLocations({
        variables: {
            filter: {
                skip: 0,
                take: 250,
                mine: true,
            },
        },
    });

    const { error, loading, data } = useMixingCards({
        fetchPolicy: 'network-only',
        pollInterval: 5000,
    });

    const cards = data ? data.mixingCards : [];
    const locations = locationsData ? locationsData.locations.items : [];

    const [focus, setFocus] =
        React.useState<MixingLinePopoverProps['focus']>(null);

    const tabFromStorage = localStorage.getItem('production_mixing_tab');

    const { palette, shape, transitions, typography } = useTheme();

    const [help, setHelp] = React.useState(false);

    const getSchema = (): Record<string, ReactElement> => {
        const res: Record<string, ReactElement> = {};

        for (const location of locations) {
            const filtered = cards.filter(
                (card) => card.location._id == location._id
            );
            res[
                location.label || location.address?.city || 'Unknown location'
            ] = (
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        gap: 2,
                        maxWidth: 500,
                        position: 'relative',
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Box p={1} />
                    {filtered.map((card, cardIndex) => (
                        <Box
                            key={card._id}
                            sx={{
                                ...shape,
                                border: `1px solid ${palette.divider}`,
                            }}
                        >
                            <Box
                                sx={{
                                    borderBottom: `1px solid ${palette.divider}`,
                                    background: palette.background.paper,
                                    p: 2,
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    src={card.profile.picture}
                                    alt={card.profile.name}
                                />
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexFlow: 'column',
                                    }}
                                >
                                    <Typography>
                                        {'Mixer: ' + card.profile.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        {'Assigned by ' +
                                            (
                                                card.created_by ||
                                                card.modified_by
                                            ).name}
                                    </Typography>
                                    {card.production_line && (
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                        >
                                            {card.production_line.name}
                                        </Typography>
                                    )}
                                </Box>
                                <Box>
                                    <IconButton onClick={() => nav(card._id)}>
                                        <MdEdit />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box>
                                {card.lines.length == 0 ? (
                                    <Box p={2}>
                                        <Typography>{`${card.profile.name} has completed their card.`}</Typography>
                                    </Box>
                                ) : (
                                    card.lines.map((line, lineIndex) => (
                                        <ButtonBase
                                            onClick={(e) => {
                                                setFocus({
                                                    element: e.currentTarget,
                                                    line,
                                                    card,
                                                });
                                            }}
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                borderBottom:
                                                    lineIndex !==
                                                    card.lines.length - 1
                                                        ? `1px solid ${palette.divider}`
                                                        : '',
                                                width: '100%',
                                                transition: transitions.create(
                                                    'all',
                                                    { duration: 250 }
                                                ),
                                                background:
                                                    palette.background.default,
                                                ':hover': {
                                                    background:
                                                        palette.action.hover,
                                                },
                                            }}
                                            key={line._id}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography>
                                                    {line.recipe.item.english}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    {line.recipe.name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography color="textSecondary">
                                                    {line.limit == null ||
                                                    line.limit == undefined
                                                        ? lineIndex == 0
                                                            ? '(Going until stopped)'
                                                            : '(Go until stopped)'
                                                        : lineIndex == 0
                                                        ? `(${line.limit} ${
                                                              line.limit == 1
                                                                  ? 'batch'
                                                                  : 'batches'
                                                          } left)`
                                                        : `(${line.limit} ${
                                                              line.limit == 1
                                                                  ? 'batch'
                                                                  : 'batches'
                                                          })`}
                                                </Typography>
                                            </Box>
                                        </ButtonBase>
                                    ))
                                )}
                            </Box>
                        </Box>
                    ))}

                    <Box sx={{ position: 'absolute', bottom: 2, left: 2 }}>
                        <Button
                            onClick={() => setHelp(true)}
                            color="inherit"
                            variant="text"
                        >
                            What are Mixing Cards?
                        </Button>
                    </Box>
                </Box>
            );
        }

        return res;
    };

    return (
        <AppNav
            error={locationsError || error}
            loading={locationsLoading || loading}
            discrete={false}
        >
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <PageTitle>Mixing Board</PageTitle>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                sx={{
                                    marginTop: -1,
                                    paddingBottom: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                {`Managers assign recipes here, mixers head to `}{' '}
                                <ButtonBase
                                    onClick={() => {
                                        window.open(
                                            'https://mixing.ldbbakery.com',
                                            '_blank'
                                        );
                                    }}
                                    sx={{
                                        ...typography.h6,
                                        color: palette.primary.main,
                                    }}
                                >
                                    mixing.ldbbakery.com
                                </ButtonBase>
                            </Typography>
                        </Box>
                    ),
                    content: (
                        <TabFade
                            start_index={
                                tabFromStorage
                                    ? isNaN(parseInt(tabFromStorage))
                                        ? 0
                                        : parseInt(tabFromStorage)
                                    : 0
                            }
                            onChange={(index) =>
                                localStorage.setItem(
                                    'production_mixing_tab',
                                    index + ''
                                )
                            }
                        >
                            {getSchema()}
                        </TabFade>
                    ),
                }}
            </ColumnBox>
            <ResponsiveDialog open={help} onClose={() => setHelp(false)}>
                <PanelHeader onClose={() => setHelp(false)}>
                    Mixing Cards
                </PanelHeader>
                <Typography>
                    Mixing cards are essentially work orders for bakers. When a
                    card is published to the Mixing Board, the bakers
                    environment will become configured for batch production.
                </Typography>
            </ResponsiveDialog>
            <AppFab
                onClick={() => {
                    nav('new');
                }}
            >
                Recipe card
            </AppFab>
            <MixingLinePopover focus={focus} onClose={() => setFocus(null)} />
        </AppNav>
    );
};

export default MixingBoard;
