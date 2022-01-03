import { Button, ButtonGroup, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

export interface ButtonToggleProps<T extends { id: string; label: string }> {
  options: T[];
  value: T;
  onChange: (val: T) => void;
}

const ButtonToggle = <T extends { id: string; label: string }>(
  props: ButtonToggleProps<T>
): ReactElement => {
  const { options, value, onChange } = props;
  const { palette } = useTheme();

  return (
    <ButtonGroup
      variant="text"
      color="inherit"
      aria-label="outlined button group"
    >
      {options.map((option) => (
        <Button
          onClick={() => onChange(option)}
          color="inherit"
          sx={{
            background: palette.background.paper,
            border: "none",
            color:
              option.id === value.id
                ? palette.text.primary
                : palette.text.secondary,
            fontWeight: option.id === value.id ? 400 : 300,
          }}
          size="large"
          key={option.id}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonToggle;
