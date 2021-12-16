import { Box, Button, ButtonProps, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";

export interface PanelActionProps {
  label: string;
  icon: ReactElement;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
}

const PanelAction = (props: PanelActionProps): ReactElement => {
  const {
    label,
    icon,
    onClick,
    variant = "contained",
    color = "primary",
  } = props;

  return (
    <Tooltip title={label} placement="top" arrow>
      <Button
        onClick={onClick}
        variant={variant}
        color={color}
        sx={{
          height: 40,
          width: 40,
          padding: 0,
          borderRadius: 16,
          minWidth: 0,
        }}
      >
        <Box sx={{ display: "flex", fontSize: "1.75rem" }}>{icon}</Box>
      </Button>
    </Tooltip>
  );
};

export default PanelAction;
