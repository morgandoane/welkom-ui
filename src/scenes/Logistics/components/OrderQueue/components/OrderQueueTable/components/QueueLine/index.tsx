import {
    Button,
    Collapse,
    Dialog,
    IconButton,
    MenuItem,
    Popover,
    Switch,
    TableCell,
    TableRow,
    TextField,
    TextFieldProps,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { OrderQueueContentInput } from '../../../../../../../../graphql/schema/OrderQueue/OrderQueueInput';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/system';
import { MdDelete, MdDragHandle } from 'react-icons/md';
import ItemField from '../../../../../../../../components/Forms/components/ItemField';
import CodeField from '../../../../../../../../components/Forms/components/CodeField';
import { CodeType } from '../../../../../../../../graphql/schema/Code/Code';
import UnitField from '../../../../../../../../components/Forms/components/UnitField';
import NumberField from '../../../../../../../../components/Forms/components/NumberField';
import LocationField from '../../../../../../../../components/Forms/components/LocationField';
import DateField from '../../../../../../../../components/Forms/components/DateField';
import CompanyField from '../../../../../../../../components/Forms/components/CompanyField';
import { useTinyCompanies } from '../../../../../../../../graphql/queries/companies/useTinyCompanies';
import ResponsiveDialog from '../../../../../../../../components/ResponsiveDialog';
import FormRow from '../../../../../../../../components/Forms/components/FormRow';
import { useTinyLocations } from '../../../../../../../../graphql/queries/locations/useTinyLocations';
import { useTinyItems } from '../../../../../../../../graphql/queries/items/useTinyItems';
import { useTinyUnits } from '../../../../../../../../graphql/queries/units/useTinyUnits';
import TimeField from '../../../../../../../../components/Forms/components/TimeField';
import { useCode } from '../../../../../../../../graphql/queries/code/useCode';

export interface QueueLineProps {
    content: OrderQueueContentInput;
    index: number;
    setContent: (contents: OrderQueueContentInput) => void;
    disabled?: boolean;
    drop: () => void;
}

const QueueLine = (props: QueueLineProps): ReactElement => {
    const { content, index, setContent, drop } = props;

    const { palette } = useTheme();

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: 'content_' + index, transition: null });

    useCode({
        variables: {
            type: CodeType.PO,
        },
        onCompleted: ({ code }) => {
            if (!content.order_code)
                setContent({ ...content, order_code: code.value });
        },
        fetchPolicy: 'network-only',
        skip: Boolean(content.order_code),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const { data: companyData } = useTinyCompanies({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const { data: locationData } = useTinyLocations({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const { data: itemData } = useTinyItems({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const { data: unitData } = useTinyUnits({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const companies = companyData ? companyData.companies.items : [];
    const locations = locationData ? locationData.locations.items : [];
    const items = itemData ? itemData.items.items : [];
    const units = unitData ? unitData.units.items : [];

    const fieldProps: TextFieldProps = {
        variant: 'standard',
        InputProps: { disableUnderline: true },
        size: 'small',
        sx: { '& .MuiSelect-icon': { display: 'none' } },
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell
                {...listeners}
                {...attributes}
                sx={{ width: 20, background: palette.background.paper }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        fontSize: '1.25rem',
                        cursor: transform ? 'grabbing' : 'grab',
                    }}
                >
                    <MdDragHandle />
                </Box>
            </TableCell>
            <TableCell sx={{ background: palette.background.paper }}>
                <TextField
                    placeholder="Item"
                    {...fieldProps}
                    select
                    value={content.item || 'Item'}
                    onChange={(e) => {
                        setContent({
                            ...content,
                            item:
                                e.target.value == 'Item'
                                    ? undefined
                                    : e.target.value,
                        });
                    }}
                    InputProps={{
                        ...fieldProps.InputProps,
                        sx: {
                            ...(fieldProps.InputProps?.sx || {}),
                            color: !content.item
                                ? palette.text.disabled
                                : undefined,
                        },
                    }}
                >
                    <MenuItem value="Item" disabled>
                        Item
                    </MenuItem>
                    {items.map((i) => (
                        <MenuItem key={i._id} value={i._id}>
                            {i.english}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
            <TableCell sx={{ background: palette.background.paper }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 80 }}>
                        <TextField
                            placeholder="Qty"
                            type="number"
                            value={content.quantity}
                            onChange={(e) => {
                                if (!e.target.value)
                                    setContent({
                                        ...content,
                                        quantity: undefined,
                                    });
                                else {
                                    const quantity = parseFloat(e.target.value);
                                    setContent({ ...content, quantity });
                                }
                            }}
                            {...fieldProps}
                        />
                    </Box>
                    <TextField
                        placeholder="Unit"
                        {...fieldProps}
                        select
                        value={content.unit || 'Unit'}
                        onChange={(e) => {
                            setContent({
                                ...content,
                                unit:
                                    e.target.value == 'Unit'
                                        ? undefined
                                        : e.target.value,
                            });
                        }}
                        InputProps={{
                            ...fieldProps.InputProps,
                            sx: {
                                ...(fieldProps.InputProps?.sx || {}),
                                color: !content.unit
                                    ? palette.text.disabled
                                    : undefined,
                            },
                        }}
                    >
                        <MenuItem value="Unit" disabled>
                            Unit
                        </MenuItem>
                        {units.map((unit) => (
                            <MenuItem key={unit._id} value={unit._id}>
                                {
                                    unit[
                                        content.quantity == 1
                                            ? 'english'
                                            : 'english_plural'
                                    ]
                                }
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </TableCell>
            <TableCell sx={{ background: palette.tonal }}>
                <TextField
                    placeholder="Vendor"
                    {...fieldProps}
                    InputProps={{
                        ...fieldProps.InputProps,
                        sx: {
                            ...(fieldProps.InputProps?.sx || {}),
                            color: !content.vendor
                                ? palette.text.disabled
                                : undefined,
                        },
                    }}
                    select
                    value={content.vendor || 'Vendor'}
                    onChange={(e) => {
                        setContent({
                            ...content,
                            vendor:
                                e.target.value == 'Vendor'
                                    ? undefined
                                    : e.target.value,
                        });
                    }}
                >
                    <MenuItem value="Vendor" disabled>
                        Vendor
                    </MenuItem>
                    {companies.map((i) => (
                        <MenuItem key={i._id} value={i._id}>
                            {i.name}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
            <TableCell sx={{ background: palette.tonal }}>
                <CodeField
                    naked
                    disabled={false}
                    type={CodeType.PO}
                    value={content.order_code || ''}
                    onChange={(order_code) => {
                        setContent({ ...content, order_code });
                    }}
                />
            </TableCell>
            <TableCell sx={{ background: palette.tonal }}>
                <LocationField
                    mine
                    naked
                    value={content.location || ''}
                    onChange={(val) => {
                        setContent({
                            ...content,
                            location: val || undefined,
                        });
                    }}
                />
            </TableCell>
            <TableCell sx={{ background: palette.tonal }}>
                <DateField
                    naked
                    value={content.date || null}
                    onChange={(val) => {
                        setContent({ ...content, date: val || undefined });
                    }}
                />
            </TableCell>
            <TableCell sx={{ width: 120, background: palette.tonal }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Switch
                        checked={content.time_sensitive}
                        onClick={() =>
                            setContent({
                                ...content,
                                time_sensitive: !content.time_sensitive,
                            })
                        }
                    />
                    <Collapse
                        in={content.time_sensitive == true}
                        orientation="horizontal"
                    >
                        <Box sx={{ width: 100 }}>
                            <TimeField
                                value={content.date || null}
                                onChange={(val) =>
                                    setContent({ ...content, date: val })
                                }
                            />
                        </Box>
                    </Collapse>
                </Box>
            </TableCell>
            <TableCell sx={{ background: palette.tonal }}>
                <IconButton onClick={() => drop()}>
                    <MdDelete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default QueueLine;
