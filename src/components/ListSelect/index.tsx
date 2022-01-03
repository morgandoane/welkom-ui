import {
  Checkbox,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { ReactElement } from "react";
import FocusedLine from "../FocusLine";

interface BaseListSelectProps<K> {
  options: K[];
  textProps: (option: K) => ListItemTextProps;
  label?: string;
}

export type ListSelectProps<K> = BaseListSelectProps<K> &
  (
    | {
        multiple: true;
        value: K[];
        onChange: (value: K[]) => void;
      }
    | {
        multiple: false;
        value: K | null;
        onChange: (value: K | null) => void;
      }
  );

const ListSelect = <K,>(props: ListSelectProps<K>): ReactElement => {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(false);

  const toggle = (option: K) => {
    if (props.multiple) {
      if (props.value.includes(option)) {
        // drop from multiple
        props.onChange(props.value.filter((val) => val !== option));
      } else {
        // add to multiple
        props.onChange([...props.value, option]);
      }
    } else {
      if (props.value == option || !option) {
        // unselect
        props.onChange(null);
      } else {
        // select
        props.onChange(option);
      }
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setFocused(false)}>
      <Box
        sx={{
          background: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
        }}
        onClick={() => setFocused(true)}
      >
        {props.label && (
          <Box sx={{ padding: 1, paddingLeft: 2 }}>
            <Typography
              variant="caption"
              color={focused ? "primary" : "textSecondary"}
            >
              {props.label}
            </Typography>
          </Box>
        )}
        <FocusedLine focused={focused} />
        <Box sx={{ maxHeight: 300, overflow: "auto" }}>
          <List disablePadding>
            {props.options.map((option, index) => (
              <ListItem
                divider={index !== props.options.length - 1}
                button
                key={"list_" + index + JSON.stringify(option)}
                onClick={() => toggle(option)}
              >
                <ListItemIcon>
                  <Checkbox
                    onClick={() => toggle(option)}
                    checked={
                      props.multiple
                        ? props.value.includes(option)
                        : props.value == option
                    }
                  />
                </ListItemIcon>
                <ListItemText {...props.textProps(option)} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default ListSelect;
