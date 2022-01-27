import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import {
    CreateExpenseInput,
    UpdateExpenseInput,
} from '../../../graphql/schema/Expense/ExpenseInput';
import CompanyField from '../components/CompanyField';
import FormRow from '../components/FormRow';
import NumberField from '../components/NumberField';
import TextFormField from '../components/TextFormField';

export interface ExpenseFormProps {
    value: CreateExpenseInput | UpdateExpenseInput;
    onChange: (value: CreateExpenseInput | UpdateExpenseInput) => void;
    customer?: string;
    vendor?: string;
}

const ExpenseForm = (props: ExpenseFormProps): ReactElement => {
    const { value, customer, vendor, onChange } = props;

    return (
        <Box>
            <FormRow>
                <CompanyField
                    label="Who's being paid?"
                    value={value.vendor || null}
                    onChange={(val) => {
                        onChange({ ...value, vendor: val || '' });
                    }}
                />
            </FormRow>
            <FormRow>
                <CompanyField
                    label="Who's being billed?"
                    value={value.customer || null}
                    onChange={(val) => {
                        onChange({ ...value, customer: val || '' });
                    }}
                />
            </FormRow>
            <FormRow>
                <NumberField
                    label="Amount"
                    value={value.amount || null}
                    onChange={(val) => {
                        onChange({ ...value, amount: val || 0 });
                    }}
                />
            </FormRow>
            <FormRow>
                <TextFormField
                    label="Invoice number (optional)"
                    value={value.invoice || ''}
                    onChange={(val) => {
                        onChange({ ...value, invoice: val || '' });
                    }}
                />
            </FormRow>
            <FormRow>
                <TextFormField
                    label="Note"
                    value={value.note || ''}
                    onChange={(val) => {
                        onChange({ ...value, note: val || '' });
                    }}
                />
            </FormRow>
        </Box>
    );
};

export default ExpenseForm;
