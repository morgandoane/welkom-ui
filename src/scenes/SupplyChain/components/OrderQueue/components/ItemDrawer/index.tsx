import { gql, useQuery } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Avatar,
    Drawer,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import Message from '../../../../../../components/feedback/Message';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import { TinyCompanyFragment } from '../../../../../../graphql/schema/Company/Company';
import {
    TinyIngredient,
    TinyIngredientFragment,
} from '../../../../../../graphql/schema/Item/extensions/Ingredient/Ingredient';
import {
    TinyMiscItem,
    TinyMiscItemFragment,
} from '../../../../../../graphql/schema/Item/extensions/Misc/MiscItem';
import {
    TinyPackaging,
    TinyPackagingFragment,
} from '../../../../../../graphql/schema/Item/extensions/Packaging/Packaging';
import {
    TinyProduct,
    TinyProductFragment,
} from '../../../../../../graphql/schema/Item/extensions/Product/Product';
import { ItemFragment } from '../../../../../../graphql/schema/Item/Item';
import { OrderQueueLineInput } from '../../../../../../graphql/schema/OrderQueueLine/OrderQueueLineInput';
import { TinyProfileFragment } from '../../../../../../graphql/schema/Profile/Profile';
import { usePreferences } from '../../../../../../graphql/schema/UserPreference/usePreferences';
import { Pagination } from '../../../../../../utils/types/Pagination';

const ItemDrawerQuery = gql`
    ${TinyIngredientFragment._document}
    ${TinyPackagingFragment._document}
    ${TinyProductFragment._document}
    ${TinyMiscItemFragment._document}
    ${TinyCompanyFragment._document}
    ${ItemFragment._document}
    ${TinyProfileFragment._document}
    query ItemDrawerQuery($search: String!) {
        ingredients(filter: { skip: 0, take: 100, name: $search }) {
            count
            items {
                ...TinyIngredientFragment
            }
        }
        packagings(filter: { skip: 0, take: 100, name: $search }) {
            count
            items {
                ...TinyPackagingFragment
            }
        }
        products(filter: { skip: 0, take: 100, name: $search }) {
            count
            items {
                ...TinyProductFragment
            }
        }
        miscItems(filter: { skip: 0, take: 100, name: $search }) {
            count
            items {
                ...TinyMiscItemFragment
            }
        }
    }
`;

export interface ItemDrawerQueryRes {
    ingredients: Pagination<TinyIngredient>;
    packagings: Pagination<TinyPackaging>;
    products: Pagination<TinyProduct>;
    miscItems: Pagination<TinyMiscItem>;
}

export interface ItemDrawerQueryArgs {
    search: string;
}

const ItemDrawer = (props: {
    queue: OrderQueueLineInput[];
    setQueue: (queue: OrderQueueLineInput[]) => void;
}): ReactElement => {
    const { queue, setQueue } = props;
    const [open, setOpen] = React.useState(false);

    const { palette, shape, breakpoints } = useTheme();
    const small = useMediaQuery(breakpoints.down('sm'));

    const [view, setView] = React.useState<
        'Ingredients' | 'Packaging' | 'Products' | 'Misc'
    >('Ingredients');

    const [search, setSearch] = React.useState('');

    const width = small ? '90vw' : '500px';

    const {
        data: preferenceData,
        error: preferenceError,
        loading: preferenceLoading,
    } = usePreferences();

    const { data, error, loading } = useQuery<
        ItemDrawerQueryRes,
        ItemDrawerQueryArgs
    >(ItemDrawerQuery, {
        variables: {
            search,
        },
    });

    const items = {
        Ingredients: data ? data.ingredients.items : [],
        Packaging: data ? data.packagings.items : [],
        Products: data ? data.products.items : [],
        Misc: data ? data.miscItems.items : [],
    };

    const listItems = items[view];

    const queuePrefs = preferenceData
        ? preferenceData.preferences.orderQueue
        : null;

    const itemClick = (item: typeof listItems[number]) => {
        const defaultLine: OrderQueueLineInput = {
            item: item._id,
            po: null,
            customer: null,
            vendor: null,
            destination: null,
            unit: null,
            quantity: null,
            date: null,
            time: null,
        };
        if (queuePrefs && queuePrefs.items.map((i) => i.item == item._id)) {
        } else {
            setQueue([...queue, defaultLine]);
        }
    };

    return (
        <React.Fragment>
            <LoadingButton
                color="primary"
                variant="contained"
                size="large"
                loadingPosition="start"
                startIcon={<MdAdd />}
                onClick={() => setOpen(true)}
            >
                Add item
            </LoadingButton>
            <Drawer
                PaperProps={{
                    sx: { width, display: 'flex', flexFlow: 'column' },
                }}
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box>
                    <Box
                        sx={{
                            padding: 2,
                            paddingBottom: 0,
                            background: palette.tonal,
                        }}
                    >
                        <Typography variant="h6">Items</Typography>
                        <Tabs
                            value={[
                                'Ingredients',
                                'Packaging',
                                'Products',
                                'Misc',
                            ].indexOf(view)}
                        >
                            <Tab
                                label="Ingredients"
                                onClick={() => setView('Ingredients')}
                            />
                            <Tab
                                label="Packaging"
                                onClick={() => setView('Packaging')}
                            />
                            <Tab
                                label="Products"
                                onClick={() => setView('Products')}
                            />
                            <Tab label="Misc" onClick={() => setView('Misc')} />
                        </Tabs>
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${palette.divider}`,
                            paddingBottom: 1,
                            paddingTop: 1,
                            background: palette.background.default,
                        }}
                    >
                        <SearchInput
                            value={search}
                            onChange={(value) => setSearch(value)}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        background: palette.background.default,
                        position: 'relative',
                    }}
                >
                    {loading || preferenceLoading ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                            }}
                        >
                            <LinearProgress />
                        </Box>
                    ) : error || preferenceError ? (
                        <Message
                            type="Error"
                            message={
                                error ? error.message : preferenceError?.message
                            }
                        />
                    ) : (
                        <List>
                            {listItems.map((item) => (
                                <ListItem
                                    key={'item_' + item._id}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => itemClick(item)}
                                        dense
                                    >
                                        <ListItemIcon>
                                            <Avatar
                                                sx={{
                                                    height: 20,
                                                    width: 20,
                                                    fontSize: '.8rem',
                                                    background:
                                                        queue.filter(
                                                            (q) =>
                                                                q.item ===
                                                                item._id
                                                        ).length > 0
                                                            ? palette.primary
                                                                  .main
                                                            : undefined,
                                                }}
                                            >
                                                {
                                                    queue.filter(
                                                        (q) =>
                                                            q.item === item._id
                                                    ).length
                                                }
                                            </Avatar>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.names.english}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Drawer>
        </React.Fragment>
    );
};

export default ItemDrawer;
