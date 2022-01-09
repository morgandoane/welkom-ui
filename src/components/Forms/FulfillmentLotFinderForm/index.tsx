import { Box, IconButton } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdDelete } from 'react-icons/md';
import { FulfillmentLotFinder } from '../../../graphql/schema/Fulfillment/FulfillmentInput';
import CompanyField from '../components/CompanyField';
import FormRow from '../components/FormRow';
import NumberField from '../components/NumberField';
import TextFormField from '../components/TextFormField';
import UnitField from '../components/UnitField';

export interface FulfillmentLotFinderFormProps {
    value: FulfillmentLotFinder;
    onChange: (value: FulfillmentLotFinder) => void;
    droppable?: boolean;
    drop?: () => void;
}

const FulfillmentLotFinderForm = (
    props: FulfillmentLotFinderFormProps
): ReactElement => {
    const { value, droppable, onChange, drop } = props;

    const { location, company, code, unit, quantity } = value;

    return (
        <Box>
            <FormRow>
                <TextFormField
                    label="Lot Number"
                    value={code}
                    onChange={(val) => {
                        onChange({ ...value, code: val || '' });
                    }}
                />
                <NumberField
                    label="Quantity"
                    value={quantity}
                    onChange={(val) => {
                        onChange({
                            ...value,
                            quantity: val == null ? null : val,
                        });
                    }}
                />
                <UnitField
                    label="Unit"
                    value={unit}
                    onChange={(val) => {
                        const copy = { ...value };
                        copy.unit = val || '';
                        onChange(copy);
                    }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {droppable && (
                        <IconButton onClick={drop}>
                            <MdDelete />
                        </IconButton>
                    )}
                </Box>
            </FormRow>
        </Box>
    );
};

export default FulfillmentLotFinderForm;
