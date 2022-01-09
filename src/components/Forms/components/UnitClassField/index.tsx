import { MenuItem, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { UnitClass } from '../../../../graphql/schema/Unit/Unit';
import { BaseUnits } from '../../../../scenes/Library/components/Units/components/UnitView/components/UnitDetails';

export interface UnitClassFieldProps {
    value: UnitClass;
    onChange: (val: UnitClass) => void;
    label: string;
    exclude?: UnitClass;
    disabled?: boolean;
}

const UnitClassField = (props: UnitClassFieldProps): ReactElement => {
    const { value, onChange, label, disabled, exclude } = props;

    return (
        <TextField
            disabled={disabled}
            fullWidth
            value={value || ''}
            onChange={(e) => onChange(e.target.value as UnitClass)}
            label={label}
            select
        >
            <MenuItem disabled value={'_'}>
                Select a measurement
            </MenuItem>
            {Object.keys(UnitClass)
                .filter((key) => {
                    if (!exclude) return true;
                    else return (key as UnitClass) !== exclude;
                })
                .map((key, index) => (
                    <MenuItem value={key} key={'unitClassOption_' + index}>
                        {exclude ? BaseUnits[key as UnitClass][1] : key}
                    </MenuItem>
                ))}
        </TextField>
    );
};

export default UnitClassField;
