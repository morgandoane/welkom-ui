import { cloneDeep } from '@apollo/client/utilities';
import {
    Box,
    Button,
    Collapse,
    Dialog,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    useTheme,
} from '@mui/material';
import { format, getMonth, getYear, isSameYear } from 'date-fns';
import React, { ReactElement } from 'react';
import { BsDot } from 'react-icons/bs';
import { MdCheck, MdExpandMore } from 'react-icons/md';
import Anima from '../../../../../../../../../../components/Anima';
import AppFab from '../../../../../../../../../../components/AppFab';
import ColumnBox from '../../../../../../../../../../components/Layout/ColumnBox';
import Message from '../../../../../../../../../../components/Message';
import PageTitle from '../../../../../../../../../../components/PageTitle';
import RecipeVersionPreview from '../../../../../../../../../../components/RecipeVersionPreview';
import { useRecipe } from '../../../../../../../../../../graphql/queries/recipe/useRecipe';
import { useRecipeVersion } from '../../../../../../../../../../graphql/queries/recipe/useRecipeVersion';
import { RecipeVersion } from '../../../../../../../../../../graphql/schema/RecipeVersion/RecipeVersion';
import { dateFormats } from '../../../../../../../../../../utils/dateFormats';

export interface VersionSelectorProps {
    open: boolean;
    recipe_id: string;
    value?: string;
    onChange: (value: RecipeVersion) => void;
    onClose: () => void;
}

const VersionSelector = (props: VersionSelectorProps): ReactElement => {
    const { open, recipe_id, value, onChange, onClose } = props;

    const { palette } = useTheme();

    const [id, setId] = React.useState(value || '');

    React.useEffect(() => {
        if (!open) setId('');
        else {
            setId(value || '');
        }
    }, [open]);

    const [expanded, setExpanded] = React.useState<Record<number, number[]>>(
        {}
    );

    const {
        data: versionData,
        error: versionError,
        loading: versionLoading,
    } = useRecipeVersion({
        variables: {
            id,
        },
        skip: !id,
        onCompleted: (data) => {
            const month = getMonth(new Date(data.recipeVersion.date_created));
            const year = getYear(new Date(data.recipeVersion.date_created));

            if (Object.keys(expanded).includes(year + '')) {
                if (expanded[year] && !expanded[year].includes(month))
                    setExpanded({
                        ...expanded,
                        [year]: [...expanded[year], month],
                    });
            } else {
                setExpanded({ ...expanded, [year]: [month] });
            }
        },
    });

    const focused = versionData ? versionData.recipeVersion : null;

    const { data, error, loading } = useRecipe({
        variables: {
            id: recipe_id,
            skip: 0,
            take: 150,
        },
        skip: !recipe_id,
    });

    const recipe = data ? data.recipe : null;
    const versionHistory = data ? data.recipeVersions : null;

    const versions = versionHistory ? versionHistory.items : [];

    const years = [
        ...new Set(versions.map((v) => getYear(new Date(v.date_created)))),
    ];
    const getMonthsForYear = (year: number) => {
        const months = [];

        const filtered = versions.filter(
            (version) => getYear(new Date(version.date_created)) == year
        );

        for (const version of filtered)
            months.push(getMonth(new Date(version.date_created)));

        return [...new Set(months)].sort();
    };

    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth
            maxWidth="xl"
            PaperProps={{
                sx: {
                    height: '90%',
                    background: palette.background.default,
                    overflow: 'hidden',
                },
            }}
        >
            {error ? (
                <Message type="Error" message={error.message} />
            ) : loading ? (
                <Message type="Loading" />
            ) : recipe && versionHistory ? (
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'stretch',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: 300,
                            background: palette.background.paper,
                            overflow: 'auto',
                        }}
                    >
                        <List>
                            {years.sort().map((year) => (
                                <React.Fragment key={'versionYear_' + year}>
                                    <ListItem
                                        button
                                        divider
                                        onClick={() => {
                                            if (
                                                Object.keys(expanded).includes(
                                                    year + ''
                                                )
                                            ) {
                                                const copy =
                                                    cloneDeep(expanded);
                                                delete copy[year];
                                                setExpanded(copy);
                                            } else {
                                                setExpanded({
                                                    ...expanded,
                                                    [year]: [],
                                                });
                                            }
                                        }}
                                    >
                                        <ListItemText primary={year} />
                                        <ListItemSecondaryAction>
                                            <Anima
                                                type="rotate"
                                                in={Object.keys(
                                                    expanded
                                                ).includes(year + '')}
                                            >
                                                <Box sx={{ display: 'flex' }}>
                                                    <MdExpandMore />
                                                </Box>
                                            </Anima>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Collapse
                                        in={Object.keys(expanded).includes(
                                            year + ''
                                        )}
                                    >
                                        <List disablePadding>
                                            {getMonthsForYear(year).map(
                                                (month) => (
                                                    <Box
                                                        key={year + '_' + month}
                                                    >
                                                        <ListItem
                                                            button
                                                            divider
                                                            sx={{
                                                                paddingLeft: 4,
                                                            }}
                                                            onClick={() => {
                                                                if (
                                                                    expanded[
                                                                        year
                                                                    ]
                                                                ) {
                                                                    if (
                                                                        expanded[
                                                                            year
                                                                        ].includes(
                                                                            month
                                                                        )
                                                                    ) {
                                                                        setExpanded(
                                                                            {
                                                                                ...expanded,
                                                                                [year]: expanded[
                                                                                    year
                                                                                ].filter(
                                                                                    (
                                                                                        m
                                                                                    ) =>
                                                                                        m !==
                                                                                        month
                                                                                ),
                                                                            }
                                                                        );
                                                                    } else {
                                                                        setExpanded(
                                                                            {
                                                                                ...expanded,
                                                                                [year]: [
                                                                                    ...expanded[
                                                                                        year
                                                                                    ],
                                                                                    month,
                                                                                ],
                                                                            }
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    dateFormats
                                                                        .months[
                                                                        month
                                                                    ][1]
                                                                }
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Anima
                                                                    type="rotate"
                                                                    in={
                                                                        expanded[
                                                                            year
                                                                        ] &&
                                                                        expanded[
                                                                            year
                                                                        ].includes(
                                                                            month
                                                                        )
                                                                    }
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                'flex',
                                                                        }}
                                                                    >
                                                                        <MdExpandMore />
                                                                    </Box>
                                                                </Anima>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        <Collapse
                                                            in={
                                                                Object.keys(
                                                                    expanded
                                                                ).includes(
                                                                    year + ''
                                                                ) &&
                                                                expanded[
                                                                    year
                                                                ].includes(
                                                                    month
                                                                )
                                                            }
                                                        >
                                                            <List
                                                                disablePadding
                                                            >
                                                                {versions
                                                                    .filter(
                                                                        (v) => {
                                                                            const date =
                                                                                new Date(
                                                                                    v.date_created
                                                                                );
                                                                            return (
                                                                                getMonth(
                                                                                    date
                                                                                ) ==
                                                                                    month &&
                                                                                getYear(
                                                                                    date
                                                                                ) ==
                                                                                    year
                                                                            );
                                                                        }
                                                                    )
                                                                    .map(
                                                                        (
                                                                            version
                                                                        ) => (
                                                                            <ListItem
                                                                                selected={
                                                                                    id
                                                                                        ? version._id ===
                                                                                          id
                                                                                        : value ==
                                                                                          version._id
                                                                                }
                                                                                button
                                                                                divider
                                                                                key={
                                                                                    'version_' +
                                                                                    version._id
                                                                                }
                                                                                sx={{
                                                                                    paddingLeft: 6,
                                                                                }}
                                                                                onClick={() =>
                                                                                    setId(
                                                                                        version._id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <ListItemText
                                                                                    primary={format(
                                                                                        new Date(
                                                                                            version.date_created
                                                                                        ),
                                                                                        dateFormats.condensedDate
                                                                                    )}
                                                                                    secondary={
                                                                                        version
                                                                                            .created_by
                                                                                            .name +
                                                                                        ' ' +
                                                                                        format(
                                                                                            new Date(
                                                                                                version.date_created
                                                                                            ),
                                                                                            dateFormats.time
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {recipe.active &&
                                                                                    recipe
                                                                                        .active
                                                                                        ._id ===
                                                                                        version._id && (
                                                                                        <Box
                                                                                            sx={{
                                                                                                display:
                                                                                                    'flex',
                                                                                                color: palette
                                                                                                    .success
                                                                                                    .main,
                                                                                                fontSize:
                                                                                                    '3rem',
                                                                                            }}
                                                                                        >
                                                                                            <BsDot />
                                                                                        </Box>
                                                                                    )}
                                                                            </ListItem>
                                                                        )
                                                                    )}
                                                            </List>
                                                        </Collapse>
                                                    </Box>
                                                )
                                            )}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                    <Box
                        sx={{
                            overflow: 'auto',
                            flex: 1,
                            justifyContent: 'center',
                            paddingLeft: 4,
                            paddingRight: 4,
                        }}
                    >
                        <Box p={2} />
                        <PageTitle>
                            {[recipe.name, recipe.item.english]}
                        </PageTitle>
                        {focused && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box sx={{ flex: 1, maxWidth: 600 }}>
                                    <RecipeVersionPreview version={focused} />
                                </Box>
                            </Box>
                        )}
                        <Box p={4} />
                    </Box>
                    {focused && (
                        <AppFab
                            icon={<MdCheck />}
                            onClick={() => {
                                onChange(focused);
                            }}
                        >
                            Use this version
                        </AppFab>
                    )}
                </Box>
            ) : (
                ''
            )}
        </Dialog>
    );
};

export default VersionSelector;
