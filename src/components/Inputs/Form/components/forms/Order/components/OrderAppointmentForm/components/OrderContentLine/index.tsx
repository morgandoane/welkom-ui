import { Tooltip } from '@mui/material/';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import React, { ReactElement } from 'react';
import { MdClear, MdDelete } from 'react-icons/md';
import { BolContentInput } from '../../../../../../../../../../graphql/inputsTypes';
import { TinyItem } from '../../../../../../../../../../graphql/schema/Item/Item';
import { useItems } from '../../../../../../../../../../graphql/schema/Item/useItems';
import { TinyUnit } from '../../../../../../../../../../graphql/schema/Unit/Unit';
import { useUnits } from '../../../../../../../../../../graphql/schema/Unit/useUnits';
import EntityField from '../../../../../../../../EntityField';

export interface OrderContentLineProps {
    value: BolContentInput;
    onChange: (value: BolContentInput | null) => void;
    error?: Error;
}

const OrderContentLine = (props: OrderContentLineProps): ReactElement => {
    const { value, onChange, error } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                paddingLeft: 2,
                paddingRight: 2,
            }}
        >
            <Box sx={{ flex: 1, display: 'flex' }}>
                <EntityField
                    sx={{ marginRight: '100px', width: 280 }}
                    error={Boolean(error)}
                    variant="standard"
                    InputProps={{ disableUnderline: error ? false : true }}
                    value={value.item}
                    onChange={(item) => onChange({ ...value, item })}
                    hook={useItems}
                    variables={{ filter: { skip: 0, take: 150 } }}
                    getData={(res) => res.items.items}
                    getProps={(item: TinyItem) => ({
                        id: item._id,
                        label: item.names.english,
                    })}
                    placeholder="Item"
                />
                <TextField
                    sx={{ width: 60 }}
                    placeholder="Qty"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    type="number"
                    value={
                        value.client_quantity == null
                            ? ''
                            : value.client_quantity
                    }
                    onChange={(e) => {
                        onChange({
                            ...value,
                            client_quantity: !e.target.value
                                ? null
                                : parseFloat(e.target.value),
                        });
                    }}
                />
                <EntityField
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    value={value.client_unit}
                    onChange={(client_unit) =>
                        onChange({ ...value, client_unit })
                    }
                    hook={useUnits}
                    variables={{ filter: { skip: 0, take: 150 } }}
                    getData={(res) => res.units.items}
                    getProps={(item: TinyUnit) => ({
                        id: item._id,
                        label: item.names[
                            value.client_quantity == 1
                                ? 'english'
                                : 'english_plural'
                        ],
                    })}
                    placeholder="Unit"
                />
            </Box>
            <Box>
                <Tooltip
                    arrow
                    title="Remove content from delivery"
                    placement="right"
                >
                    <IconButton onClick={() => onChange(null)} size="small">
                        <MdClear />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default OrderContentLine;
