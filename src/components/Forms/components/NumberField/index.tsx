import { TextField } from "@mui/material";
import React, { ReactElement } from "react";

export interface NumberFieldProps {
  label: string;
  value: number | null;
  onChange: (val: number | null) => void;
}

const NumberField = (props: NumberFieldProps): ReactElement => {
  const { label, value, onChange } = props;

  return (
    <TextField
      fullWidth
      value={value == null ? "" : value}
      onChange={(e) =>
        onChange(e.target.value ? parseFloat(e.target.value) : null)
      }
      label={label}
      type="number"
    />
  );
};

export default NumberField;
