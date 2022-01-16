import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import {
    CreateFolderInput,
    UpdateFolderInput,
} from '../../../graphql/schema/Folder/FolderInput';
import FormRow from '../components/FormRow';
import TextFormField from '../components/TextFormField';

export interface FolderFormProps {
    value: UpdateFolderInput | CreateFolderInput | null;
    onChange: (val: UpdateFolderInput | CreateFolderInput) => void;
}

const FolderForm = (props: FolderFormProps): ReactElement => {
    const { value, onChange } = props;

    return (
        <Box>
            <FormRow>
                <TextFormField
                    label="Name"
                    value={value ? value.name || '' : ''}
                    onChange={(val) => onChange({ ...value, name: val || '' })}
                />
            </FormRow>
        </Box>
    );
};

export default FolderForm;
