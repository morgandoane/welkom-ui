import { TextField } from "@mui/material";
import React, { ReactElement } from "react";

export interface TextFormFieldProps {
  value: string | null;
  onChange: (val: string | null) => void;
  label: string;
  disabled?: boolean;
}

const TextFormField = (props: TextFormFieldProps): ReactElement => {
  const { value, onChange, label, disabled } = props;

  return (
    <TextField
      disabled={disabled}
      fullWidth
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      label={label}
    />
  );
};

export default TextFormField;
