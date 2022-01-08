import { Autocomplete, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import {
  TinyLocation,
  useTinyLocations,
} from "../../../../graphql/queries/locations/useTinyLocations";
import AutoCompleteTextField from "../AutoCompleteTextField";

export interface LocationFieldProps {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  company?: string;
  naked?: boolean;
  mine?: boolean;
}

const LocationField = (props: LocationFieldProps): ReactElement => {
  const {
    label = "Location",
    value,
    company,
    onChange,
    naked = false,
    mine,
  } = props;

  const { data, error, loading } = useTinyLocations({
    variables: {
      filter: {
        skip: 0,
        take: 100,
        company,
        mine,
      },
    },
  });

  const getLabel = ({ label, address }: TinyLocation): string => {
    if (label) return label;
    if (address) return address.city;
    return "Unknown location";
  };

  const locations = data
    ? data.locations.items.map((i) => ({
        ...i,
        label: getLabel(i),
        id: i._id,
      }))
    : [];

  const match = locations.find((location) => location._id === value);

  return (
    <Autocomplete
      fullWidth
      value={match || null}
      onChange={(e, val) => {
        onChange(val ? val._id : null);
      }}
      options={locations}
      getOptionLabel={(d) => getLabel(d)}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {getLabel(option)}
          </li>
        );
      }}
      renderInput={(params) => (
        <AutoCompleteTextField {...params} label={label} naked={naked} />
      )}
    />
  );
};

export default LocationField;
