import {
    Box,
    ClickAwayListener,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemIcon,
    Checkbox,
    useTheme,
    Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import FocusedLine from '../../feedback/FocusLine';

export interface ListSelectionProps<D> {
    children: D[];
    label?: string;
    getProps: (data: D) => {
        id: string;
        primary: string;
        secondary?: string;
        avatar?: string;
    };
    value: D[];
    onChange: (value: D[]) => void;
}

const ListSelection = <D,>(props: ListSelectionProps<D>): ReactElement => {
    const { children: data, getProps, value, onChange, label } = props;

    const { palette, shape } = useTheme();

    const [focused, setFocused] = React.useState(false);

    return (
        <ClickAwayListener onClickAway={() => setFocused(false)}>
            <Box
                sx={{
                    ...shape,
                    maxHeight: 400,
                    display: 'flex',
                    flexFlow: 'column',
                    flex: 1,
                    border: `1px solid ${palette.divider}`,
                }}
                onClick={() => setFocused(true)}
            >
                {label && (
                    <React.Fragment>
                        <Box sx={{ p: 1.5, background: palette.action.hover }}>
                            <Typography color="textSecondary">
                                {label}
                            </Typography>
                        </Box>
                        <FocusedLine focused={focused} />
                    </React.Fragment>
                )}
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <List>
                        {data.map((d) => {
                            const { id, primary, secondary, avatar } =
                                getProps(d);

                            return (
                                <ListItem
                                    key={'select_' + id}
                                    button
                                    divider
                                    onClick={() => {
                                        if (
                                            value
                                                .map((v) => getProps(v).id)
                                                .includes(id)
                                        ) {
                                            onChange(
                                                [...value].filter(
                                                    (d) => getProps(d).id !== id
                                                )
                                            );
                                        } else {
                                            onChange([...value, d]);
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={value
                                                .map((v) => getProps(v).id)
                                                .includes(id)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={primary}
                                        secondary={secondary}
                                    />
                                    {avatar && (
                                        <ListItemSecondaryAction>
                                            {avatar}
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Box>
        </ClickAwayListener>
    );
};

export default ListSelection;
