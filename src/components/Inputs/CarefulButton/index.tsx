import { LoadingButton } from '@mui/lab';
import { Button, ButtonProps, ClickAwayListener } from '@mui/material';
import React, { ReactElement } from 'react';

export interface CarefullButtonProps {
    onClick: () => void;
    children: string;
    startIcon?: ButtonProps['startIcon'];
    endIcon?: ButtonProps['endIcon'];
    size?: ButtonProps['size'];
    disabled?: ButtonProps['disabled'];
    loading?: boolean;
}

const CarefullButton = (props: CarefullButtonProps): ReactElement => {
    const {
        onClick,
        children: label,
        startIcon,
        endIcon,
        size,
        disabled,
        loading = false,
    } = props;

    const [focused, setFocused] = React.useState(false);

    return (
        <ClickAwayListener onClickAway={() => setFocused(false)}>
            <LoadingButton
                loading={loading}
                variant={focused ? 'contained' : 'outlined'}
                color={focused ? 'error' : 'inherit'}
                onClick={() => {
                    if (focused) {
                        onClick();
                    } else {
                        setFocused(true);
                    }
                }}
                startIcon={startIcon}
                endIcon={endIcon}
                size={size}
                disabled={disabled}
            >
                {label}
            </LoadingButton>
        </ClickAwayListener>
    );
};

export default CarefullButton;
