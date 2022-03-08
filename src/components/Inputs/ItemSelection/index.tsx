import {
    Box,
    Button,
    Divider,
    InputAdornment,
    List,
    ListItem,
    Popover,
    Tab,
    Tabs,
    TextField,
    useTheme,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    LinearProgress,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdSearch } from 'react-icons/md';
import { useIngredients } from '../../../graphql/schema/Item/extensions/Ingredient/useIngredients';
import { usePackaging } from '../../../graphql/schema/Item/extensions/Packaging/usePackaging';
import { useProducts } from '../../../graphql/schema/Item/extensions/Product/useProducts';
import SearchInput from '../SearchInput';

export interface ItemSelectionProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
}

const ItemSelection = (props: ItemSelectionProps): ReactElement => {
    const { label = 'Item', value, onChange } = props;

    const { palette } = useTheme();

    const [tab, setTab] = React.useState<
        'Ingredients' | 'Packaging' | 'Products'
    >('Ingredients');

    const [focus, setFocus] = React.useState<null | { element: Element }>(null);

    const [filter, setFilter] = React.useState({ skip: 0, take: 50, name: '' });

    const {
        data: productData,
        error: productError,
        loading: productLoading,
    } = useProducts({
        variables: { filter },
    });

    const {
        data: ingreidentData,
        error: ingreidentError,
        loading: ingreidentLoading,
    } = useIngredients({
        variables: { filter },
    });

    const {
        data: packagingData,
        error: packagingError,
        loading: packagingLoading,
    } = usePackaging({
        variables: { filter },
    });

    const products = productData ? productData.products.items : [];
    const ingredients = ingreidentData ? ingreidentData.ingredients.items : [];
    const packaging = packagingData ? packagingData.packagings.items : [];

    const items = [...products, ...ingredients, ...packaging];
    const loading = productLoading || ingreidentLoading || packagingLoading;
    const error = productError || ingreidentError || packagingError;

    const item = items.find((d) => d._id === value);

    const list =
        tab == 'Ingredients'
            ? ingredients
            : tab == 'Packaging'
            ? packaging
            : products;

    return (
        <React.Fragment>
            <Button
                size="large"
                variant="contained"
                color="inherit"
                onClick={(e) => setFocus({ element: e.currentTarget })}
            >
                {item ? `Item: ${item.names.english}` : 'Select an item'}
            </Button>

            <Popover
                open={Boolean(focus)}
                onClose={() => setFocus(null)}
                anchorEl={focus ? focus.element : null}
            >
                <Box>
                    <Box sx={{ paddingLeft: 2, paddingBottom: 0 }}>
                        <Tabs
                            value={[
                                'Ingredients',
                                'Packaging',
                                'Products',
                            ].indexOf(tab)}
                        >
                            <Tab
                                label="Ingredients"
                                onClick={() => setTab('Ingredients')}
                            />
                            <Tab
                                label="Packaging"
                                onClick={() => setTab('Packaging')}
                            />
                            <Tab
                                label="Products"
                                onClick={() => setTab('Products')}
                            />
                        </Tabs>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            minHeight: 200,
                            maxHeight: 400,
                            background: palette.background.default,
                            display: 'flex',
                            flexFlow: 'column',
                            position: 'relative',
                        }}
                    >
                        {loading && (
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
                        )}
                        <Box sx={{ paddingTop: 1 }}>
                            <Box sx={{ p: 1 }}>
                                <SearchInput
                                    value={filter.name}
                                    onChange={(name) =>
                                        setFilter({ ...filter, name })
                                    }
                                />
                            </Box>
                            <Divider />
                        </Box>
                        <Box sx={{ flex: 1, overflow: 'auto' }}>
                            <List disablePadding>
                                {list.map((item) => (
                                    <ListItem divider key={item._id}>
                                        <ListItemButton
                                            role={undefined}
                                            onClick={() => {
                                                if (value == item._id)
                                                    onChange('');
                                                else onChange(item._id);
                                            }}
                                            dense
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={value == item._id}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.names.english}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </React.Fragment>
    );
};

export default ItemSelection;
