import {
    Autocomplete,
    CircularProgress,
    MenuItem,
    TextField,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { CompanyFilter } from '../../../graphql/inputsTypes';
import { useCompanies } from '../../../graphql/schema/Company/useCompanies';

export interface CompanySelectionProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const CompanySelection = (props: CompanySelectionProps): ReactElement => {
    const { value, onChange, label = 'Company' } = props;

    const [filter, setFilter] = React.useState<CompanyFilter>({
        skip: 0,
        take: 200,
    });

    const { data, error, loading } = useCompanies({ variables: { filter } });

    const companies = data ? data.companies.items : [];

    return (
        <TextField
            label={label}
            fullWidth
            value={value}
            onChange={(e) => {
                onChange(e.target.value || '');
            }}
            select
        >
            {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                    {company.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default CompanySelection;
