import {
    Box,
    Chip,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdSearch } from 'react-icons/md';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../components/SideDrawer';
import { useItemCategories } from '../../../../../../graphql/queries/itemCategories/useItemCategories';
import { useTinyItems } from '../../../../../../graphql/queries/items/useTinyItems';
import { TinyItem } from '../../../../../../graphql/schema/Item/Item';
import { ItemFilter } from '../../../../../../graphql/schema/Item/ItemFilter';
import { OrderQueueContentInput } from '../../../../../../graphql/schema/OrderQueue/OrderQueueInput';

export interface ItemDrawerProps {
    open: boolean;
    onClose: () => void;
    contents: OrderQueueContentInput[];
    addItem: (item: TinyItem) => void;
}

const ItemDrawer = (props: ItemDrawerProps): ReactElement => {
    const { open, onClose, contents, addItem } = props;
    const { palette } = useTheme();

    const [search, setSearch] = React.useState('');

    const [filter, setFilter] = React.useState<ItemFilter>({
        skip: 0,
        take: 200,
    });

    const { data } = useTinyItems({
        variables: {
            filter,
        },
    });

    const items = data ? data.items.items : [];

    const filtered = items.filter((item) =>
        item.english.toLowerCase().includes(search.toLowerCase())
    );

    const { data: catData } = useItemCategories();

    const cats = catData ? catData.itemCategories : [];

    return (
        <SideDrawer disable_padding open={open} onClose={onClose}>
            <ColumnBox>
                {{
                    header: (
                        <Box
                            sx={{
                                padding: 2,
                                paddingBottom: 0,
                                borderBottom: `1px solid ${palette.divider}`,
                            }}
                        >
                            <PanelHeader>Add items</PanelHeader>
                            <Stack
                                sx={{ paddingBottom: 2 }}
                                direction="row"
                                spacing={1}
                            >
                                {cats.map((cat) => (
                                    <Chip
                                        label={cat.label}
                                        key={'chip_' + cat._id}
                                        color={
                                            filter.category === cat._id
                                                ? 'primary'
                                                : undefined
                                        }
                                        onClick={() => {
                                            if (filter.category === cat._id)
                                                setFilter({
                                                    ...filter,
                                                    category: undefined,
                                                });
                                            else
                                                setFilter({
                                                    ...filter,
                                                    category: cat._id,
                                                });
                                        }}
                                    />
                                ))}
                            </Stack>
                            <TextField
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MdSearch />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search"
                                fullWidth
                                variant="standard"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Box>
                    ),
                    content: (
                        <Box>
                            <List>
                                {filtered.map((item, i) => (
                                    <ListItem
                                        onClick={() => addItem(item)}
                                        button
                                        key={item._id}
                                    >
                                        <ListItemText primary={item.english} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ),
                }}
            </ColumnBox>
        </SideDrawer>
    );
};

export default ItemDrawer;
