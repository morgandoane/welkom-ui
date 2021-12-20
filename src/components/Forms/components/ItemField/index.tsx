import { Autocomplete, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { useTinyItems } from "../../../../graphql/queries/items/useTinyItems";

export interface ItemFieldProps {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const ItemField = (props: ItemFieldProps): ReactElement => {
  const { label = "Item", value, onChange } = props;

  const { data, error, loading } = useTinyItems({
    variables: {
      filter: {
        skip: 0,
        take: 100,
      },
    },
  });

  const items = data
    ? data.items.items.map((i) => ({ ...i, label: i.english, id: i._id }))
    : [];

  const match = items.find((item) => item._id === value);

  return (
    <Autocomplete
      fullWidth
      value={match || null}
      onChange={(e, val) => {
        onChange(val ? val._id : null);
      }}
      options={items}
      getOptionLabel={(d) => d.english}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.english}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default ItemField;
