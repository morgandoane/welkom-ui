import {
    Box,
    Button,
    Dialog,
    Popover,
    PopoverProps,
    Typography,
    useTheme,
} from '@mui/material';
import format from 'date-fns/format';
import React, { ReactElement } from 'react';
import RecipeVersionPreview from '../../../../../../../../components/RecipeVersionPreview';
import { MixingCard } from '../../../../../../../../graphql/schema/MixingCard/MixingCard';
import { MixingCardLine } from '../../../../../../../../graphql/schema/MixingCardLine/MixingCardLine';
import { dateFormats } from '../../../../../../../../utils/dateFormats';

export interface MixingLinePopoverProps {
    focus: {
        element: Element | null;
        card: MixingCard;
        line: MixingCardLine;
    } | null;
    onClose: () => void;
    anchorOrigin?: PopoverProps['anchorOrigin'];
}

const MixingLinePopover = (props: MixingLinePopoverProps): ReactElement => {
    const {
        focus,
        onClose,
        anchorOrigin = {
            vertical: 'top',
            horizontal: 'left',
        },
    } = props;

    const [closing, setClosing] = React.useState(false);

    const [showRecipe, setShowRecipe] = React.useState(false);

    const { palette } = useTheme();

    React.useEffect(() => {
        if (closing) {
            const timeout = setTimeout(() => {
                setClosing(false);
                setShowRecipe(false);
                onClose();
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [closing, onClose]);

    const version = !focus
        ? null
        : focus.line.recipe_version || focus.line.recipe.active || null;

    return (
        <React.Fragment>
            <Popover
                anchorEl={focus ? focus.element : null}
                open={Boolean(focus) && !closing}
                onClose={() => {
                    setClosing(true);
                }}
                anchorOrigin={anchorOrigin}
            >
                {focus && (
                    <Box p={2}>
                        <Typography variant="h5">
                            {focus.line.recipe.name}
                        </Typography>
                        <Box p={1} />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 8,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="textSeconary"
                                >
                                    Item
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">
                                    {focus.line.recipe.item.english}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 8,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="textSeconary"
                                >
                                    Recipe version
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">
                                    {focus.line.recipe_version
                                        ? format(
                                              new Date(
                                                  focus.line.recipe_version.date_created
                                              ),
                                              dateFormats.condensedDate
                                          )
                                        : 'Using latest'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box p={1} />
                        <Button fullWidth onClick={() => setShowRecipe(true)}>
                            View recipe
                        </Button>
                    </Box>
                )}
            </Popover>
            <Dialog
                open={showRecipe && !closing}
                onClose={() => setClosing(true)}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        background: palette.background.default,
                        height: '85vh',
                        display: 'flex',
                        flexFlow: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        overflow: 'auto',
                    },
                }}
            >
                {focus && (
                    <Box sx={{ flex: 1, maxWidth: 500 }}>
                        <Box p={6} />
                        <Box />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Box>
                                <Typography variant="h4">
                                    {focus.line.recipe.name}
                                </Typography>
                                <Typography variant="body1">
                                    {focus.line.recipe.item.english}
                                </Typography>
                            </Box>

                            {version && (
                                <Box>
                                    <Typography
                                        sx={{
                                            color:
                                                version._id !==
                                                focus.line.recipe.active?._id
                                                    ? palette.error.main
                                                    : palette.success.main,
                                        }}
                                    >
                                        <em>
                                            {version._id !==
                                            focus.line.recipe.active?._id
                                                ? 'inactive!'
                                                : 'active!'}
                                        </em>
                                    </Typography>
                                    <Typography>
                                        {format(
                                            new Date(version.date_created),
                                            dateFormats.condensedDate
                                        )}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Box p={1} />
                        {version && <RecipeVersionPreview version={version} />}
                        <Box p={6} />
                    </Box>
                )}
            </Dialog>
        </React.Fragment>
    );
};

export default MixingLinePopover;
