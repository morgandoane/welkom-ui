import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import {
    CreateCompanyInput,
    UpdateCompanyInput,
} from '../../../../graphql/schema/Company/CompanyInput';
import CarefulButton from '../../CarefulButton';
import FormRow from '../../components/FormRow';
import TextFormField from '../../components/TextFormField';

export type CompanyFormType = 'create' | 'update';

export type CompanyFormProps<T extends CompanyFormType> = T extends 'create'
    ? {
          value: CreateCompanyInput;
          onChange: (value: CreateCompanyInput) => void;
          onSubmit: (value: CreateCompanyInput) => void;
          onCancel: () => void;
      }
    : T extends 'update'
    ? {
          value: UpdateCompanyInput;
          onChange: (value: UpdateCompanyInput) => void;
          onSubmit: (value: UpdateCompanyInput) => void;
          onCancel: () => void;
      }
    : never;

const CompanyForm = <T extends CompanyFormType>(props: {
    type: T;
    form: CompanyFormProps<T>;
}): ReactElement => {
    const { type, form } = props;
    const { value, onChange, onSubmit, onCancel } = form;

    return (
        <Box>
            <FormRow>
                <TextFormField
                    label="Name"
                    value={value.name || ''}
                    onChange={(val) => {
                        switch (type) {
                            case 'create': {
                                onChange({ ...value, name: val || '' });
                                break;
                            }
                            case 'update': {
                                onChange({ ...value, name: val || '' });
                                break;
                            }
                        }
                    }}
                />
            </FormRow>
            <Box
                sx={{
                    display: 'flex',

                    alignItems: 'center',
                }}
            >
                {type === 'update' && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                        <CarefulButton
                            startIcon={<MdDelete />}
                            onClick={() => {
                                if (type === 'update') {
                                    const newVal: UpdateCompanyInput = {
                                        ...value,
                                    };
                                    newVal.deleted = true;
                                    onChange(newVal);
                                    onSubmit(newVal);
                                }
                            }}
                        >
                            Delete
                        </CarefulButton>
                    </Box>
                )}
                <Box sx={{ flex: 1 }} />
                <Box>
                    <Button
                        onClick={() => {
                            onSubmit(value);
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CompanyForm;
