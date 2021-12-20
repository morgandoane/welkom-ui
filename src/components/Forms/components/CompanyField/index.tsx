import { Autocomplete, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { useTinyCompanies } from "../../../../graphql/queries/companies/useTinyCompanies";

export interface CompanyFieldProps {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const CompanyField = (props: CompanyFieldProps): ReactElement => {
  const { label = "Company", value, onChange } = props;

  const { data, error, loading } = useTinyCompanies({
    variables: {
      filter: {
        skip: 0,
        take: 100,
      },
    },
  });

  const companies = data
    ? data.companies.items.map((i) => ({ ...i, label: i.name, id: i._id }))
    : [];

  const match = companies.find((u) => u._id === value);

  return (
    <Autocomplete
      fullWidth
      value={match || null}
      onChange={(e, val) => {
        onChange(val ? val._id : null);
      }}
      options={companies}
      getOptionLabel={(d) => d.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
    />
  );
};

export default CompanyField;
