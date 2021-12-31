import { AutocompleteRenderInputParams, TextField } from "@mui/material";
import React, { ReactElement } from "react";

export interface AutoCompleteTextFieldProps
  extends AutocompleteRenderInputParams {
  label?: string;
  naked?: boolean;
}

const AutoCompleteTextField = (
  props: AutoCompleteTextFieldProps
): ReactElement => {
  const { label, naked, ...params } = props;

  return (
    <TextField
      {...{
        ...params,
        InputProps: {
          ...params.InputProps,
          disableUnderline: naked ? true : undefined,
        },
      }}
      label={naked ? undefined : label}
      placeholder={naked ? label : undefined}
      fullWidth
      variant={naked ? "standard" : undefined}
    />
  );
};

export default AutoCompleteTextField;
