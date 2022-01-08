import { Autocomplete, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { useTinyCompanies } from "../../../../graphql/queries/companies/useTinyCompanies";
import { TinyCompany } from "../../../../graphql/schema/Company/Company";
import AutoCompleteTextField from "../AutoCompleteTextField";

export interface CompanyFieldProps {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  naked?: boolean;
  allow_unassigned?: boolean;
  mine?: boolean;
}

const CompanyField = (props: CompanyFieldProps): ReactElement => {
  const {
    label = "Company",
    value,
    onChange,
    naked = false,
    allow_unassigned = false,
    mine,
  } = props;

  const { data, error, loading } = useTinyCompanies({
    variables: {
      filter: {
        skip: 0,
        take: 100,
        mine: mine,
      },
    },
  });

  const companies = data
    ? data.companies.items.map((i) => ({ ...i, label: i.name, id: i._id }))
    : [];

  const unAssigned: TinyCompany = {
    _id: "unassigned",
    name: "Unassigned",
  };

  const options: TinyCompany[] = allow_unassigned
    ? [unAssigned, ...companies]
    : companies;

  const match = companies.find((u) => u._id === value);

  return (
    <Autocomplete
      fullWidth
      value={match ? match : allow_unassigned ? unAssigned : null}
      onChange={(e, val) => {
        if (!val) onChange(null);
        else if (val._id == "unassigned") onChange(null);
        else onChange(val._id);
      }}
      options={options.map((c) => ({ ...c, id: c._id, label: c.name }))}
      getOptionLabel={(d) => d.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <AutoCompleteTextField {...params} label={label} naked={naked} />
      )}
    />
  );
};

export default CompanyField;
