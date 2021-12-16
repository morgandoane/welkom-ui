import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import {
  Button,
  ButtonProps,
  ClickAwayListener,
  useTheme,
} from "@mui/material";
import React, { ReactElement, ReactNode, ReactNodeArray } from "react";

export type CarefulButtonProps = {
  children: ReactNode | ReactNodeArray;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  from?: ButtonProps;
  to?: ButtonProps;
  size?: LoadingButtonProps["size"];
  startIcon?: LoadingButtonProps["startIcon"];
  endIcon?: LoadingButtonProps["startIcon"];
};

const CarefulButton = (props: CarefulButtonProps): ReactElement => {
  const theme = useTheme();

  const {
    from = { variant: "outlined", color: "inherit", fullWidth: true },
    to = { variant: "contained", color: "error", fullWidth: true },
    children,
    onClick,
    loading,
    disabled,
    size,
    startIcon,
    endIcon,
  } = props;

  const [focused, setFocused] = React.useState(false);

  return (
    <ClickAwayListener onClickAway={() => setFocused(false)}>
      <LoadingButton
        endIcon={endIcon}
        size={size}
        startIcon={startIcon}
        disabled={disabled}
        loading={loading}
        {...(focused ? to : from)}
        sx={{
          ...(focused ? to : from).sx,
          transition: theme.transitions.create("all", { duration: 180 }),
        }}
        onClick={() => {
          if (focused) onClick();
          else setFocused(true);
        }}
      >
        {children}
      </LoadingButton>
    </ClickAwayListener>
  );
};

export default CarefulButton;
