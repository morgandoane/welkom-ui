import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import React, { ReactElement } from 'react';

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
            label={naked ? undefined : label}
            placeholder={naked ? label : undefined}
            variant={naked ? 'standard' : undefined}
            {...{
                ...params,
                InputProps: {
                    ...params.InputProps,
                    disableUnderline: naked ? true : undefined,
                },
            }}
        />
    );
};

export default AutoCompleteTextField;
