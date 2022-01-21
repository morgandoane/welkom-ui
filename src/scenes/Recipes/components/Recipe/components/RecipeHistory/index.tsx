import { TreeView, TreeItem } from '@mui/lab';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { format, getMonth, getYear, isSameYear } from 'date-fns';
import React, { ReactElement } from 'react';
import { BsDot } from 'react-icons/bs';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import Message from '../../../../../../components/Message';
import Nest, { NestProps } from '../../../../../../components/Nest';
import RecipeVersionPreview from '../../../../../../components/RecipeVersionPreview';
import { useRecipeVersion } from '../../../../../../graphql/queries/recipe/useRecipeVersion';
import { Pagination } from '../../../../../../graphql/schema/Pagination/Pagination';
import { Recipe } from '../../../../../../graphql/schema/Recipe/Recipe';
import { TionyRecipeVersion } from '../../../../../../graphql/schema/RecipeVersion/TinyRecipeVersion';
import { dateFormats } from '../../../../../../utils/dateFormats';

export interface RecipeHistoryProps {
    recipe: Recipe;
    versionList: Pagination<TionyRecipeVersion> | null;
}

const RecipeHistory = (props: RecipeHistoryProps): ReactElement => {
    const { recipe, versionList } = props;

    const { palette, shape } = useTheme();

    const fromStorage = localStorage.getItem('recipe_history_expanded') || '';
    const focusedFromStorage =
        localStorage.getItem('recipe_history_focused') || '';

    const [focused, setFocused] = React.useState(
        focusedFromStorage || recipe.active?._id || ''
    );

    const [expanded, setExpanded] = React.useState<string[]>(
        fromStorage.split(',')
    );

    React.useEffect(() => {
        localStorage.setItem('recipe_history_expanded', expanded.join(','));
    }, [expanded]);

    React.useEffect(() => {
        localStorage.setItem('recipe_history_focused', focused);
    }, [focused]);

    const {
        data: versionData,
        error: versionError,
        loading: versionLoading,
    } = useRecipeVersion({
        variables: {
            id: focused || '',
        },
        skip: !focused || focused == '',
    });

    const groups = recipe ? recipe.version_date_groups : [];

    const versions = versionList ? versionList.items : [];

    const avaliableYears = [
        ...new Set(versions.map((v) => getYear(new Date(v.date_created)))),
    ];

    const nodeStyles = {
        '.MuiTreeItem-content': {
            padding: 2,
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            <Box p={2} />
            <Box
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexFlow: 'row',
                    border: `1px solid ${palette.divider}`,
                    ...shape,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        background: palette.background.paper,
                        width: 350,
                    }}
                >
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        <TreeView
                            selected={focused}
                            onNodeToggle={(e, ids) => setExpanded(ids)}
                            expanded={expanded}
                            aria-label="file system navigator"
                            defaultCollapseIcon={<MdExpandMore />}
                            defaultExpandIcon={<MdChevronRight />}
                        >
                            {avaliableYears.map((year, yearIndex) => (
                                <TreeItem
                                    defaultChecked
                                    sx={{ ...nodeStyles }}
                                    key={'year_' + yearIndex}
                                    nodeId={year.toString()}
                                    label={year.toString()}
                                >
                                    {groups
                                        .filter((group) => group.year === year)
                                        .map((g, monthIndex) => (
                                            <TreeItem
                                                defaultChecked
                                                sx={{ ...nodeStyles }}
                                                key={
                                                    'year_' +
                                                    yearIndex +
                                                    'month_' +
                                                    monthIndex
                                                }
                                                nodeId={
                                                    year.toString() +
                                                    monthIndex.toString()
                                                }
                                                label={
                                                    dateFormats.months[
                                                        g.month - 1
                                                    ][1]
                                                }
                                            >
                                                {versions
                                                    .filter(
                                                        (v) =>
                                                            getYear(
                                                                new Date(
                                                                    v.date_created
                                                                )
                                                            ) == year &&
                                                            getMonth(
                                                                new Date(
                                                                    v.date_created
                                                                )
                                                            ) ==
                                                                g.month - 1
                                                    )
                                                    .map((version) => (
                                                        <TreeItem
                                                            onClick={() =>
                                                                setFocused(
                                                                    version._id
                                                                )
                                                            }
                                                            sx={{
                                                                ...nodeStyles,
                                                            }}
                                                            key={version._id}
                                                            nodeId={version._id}
                                                            label={
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            flex: 1,
                                                                        }}
                                                                    >
                                                                        <Typography>
                                                                            {format(
                                                                                new Date(
                                                                                    version.date_created
                                                                                ),
                                                                                dateFormats.condensedDate +
                                                                                    ' ' +
                                                                                    dateFormats.time
                                                                            )}
                                                                        </Typography>
                                                                        <Typography
                                                                            color="textSecondary"
                                                                            variant="caption"
                                                                        >
                                                                            {
                                                                                version
                                                                                    .created_by
                                                                                    .name
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                    {recipe.active &&
                                                                        recipe
                                                                            .active
                                                                            ._id ===
                                                                            version._id && (
                                                                            <Box
                                                                                sx={{
                                                                                    paddingRight: 4,
                                                                                    display:
                                                                                        'flex',
                                                                                    color: palette
                                                                                        .success
                                                                                        .main,
                                                                                    fontSize:
                                                                                        '4rem',
                                                                                }}
                                                                            >
                                                                                <BsDot />
                                                                            </Box>
                                                                        )}
                                                                </Box>
                                                            }
                                                        />
                                                    ))}
                                            </TreeItem>
                                        ))}
                                </TreeItem>
                            ))}
                        </TreeView>
                    </Box>
                    <Box
                        sx={{ p: 2, borderTop: `1px solid ${palette.divider}` }}
                    >
                        <Typography>
                            {`Showing ${versions.length} of ${
                                versionList?.count || 0
                            } versions`}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ paddingTop: 3, minWidth: 500 }}>
                        {versionLoading ? (
                            <Message type="Loading" />
                        ) : versionData ? (
                            <Box>
                                {recipe.active &&
                                recipe.active._id ===
                                    versionData.recipeVersion._id ? (
                                    <Typography
                                        variant="body2"
                                        color={palette.success.main}
                                    >
                                        <em>Active!</em>
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color={palette.warning.main}
                                    >
                                        <em>Inactive!</em>
                                    </Typography>
                                )}
                                <Typography variant="h5">
                                    {format(
                                        new Date(
                                            versionData.recipeVersion.date_created
                                        ),
                                        dateFormats.condensedDate +
                                            ' ' +
                                            dateFormats.time
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >{`${
                                    versionData.recipeVersion.note
                                        ? versionData.recipeVersion.note + ' - '
                                        : ''
                                }${
                                    versionData.recipeVersion.created_by.name
                                }`}</Typography>
                                <Box p={1} />
                                <RecipeVersionPreview
                                    version={versionData.recipeVersion}
                                />
                                <Box p={4} />
                            </Box>
                        ) : (
                            <Message
                                type="Info"
                                message="Select a version from timeline"
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RecipeHistory;
