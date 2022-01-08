import {
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdSearch } from "react-icons/md";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PanelHeader from "../../../../../../components/PanelComponents/PanelHeader";
import SideDrawer from "../../../../../../components/SideDrawer";
import { useTinyItems } from "../../../../../../graphql/queries/items/useTinyItems";
import { TinyItem } from "../../../../../../graphql/schema/Item/Item";
import { OrderQueueContentInput } from "../../../../../../graphql/schema/OrderQueue/OrderQueueInput";

export interface ItemDrawerProps {
  open: boolean;
  onClose: () => void;
  contents: OrderQueueContentInput[];
  addItem: (item: TinyItem) => void;
}

const ItemDrawer = (props: ItemDrawerProps): ReactElement => {
  const { open, onClose, contents, addItem } = props;
  const { palette } = useTheme();

  const [search, setSearch] = React.useState("");

  const { data } = useTinyItems({
    variables: {
      filter: {
        skip: 0,
        take: 200,
      },
    },
  });

  const items = data ? data.items.items : [];

  const filtered = items.filter((item) =>
    item.english.toLowerCase().includes(search.toLowerCase())
  );

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
                  <ListItem onClick={() => addItem(item)} button key={item._id}>
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
