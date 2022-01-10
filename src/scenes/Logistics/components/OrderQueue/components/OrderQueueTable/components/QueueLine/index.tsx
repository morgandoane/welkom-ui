import {
    Button,
    Dialog,
    IconButton,
    Popover,
    TableCell,
    TableRow,
    Typography,
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

export interface QueueLineProps {
    content: OrderQueueContentInput;
    index: number;
    setContent: (contents: OrderQueueContentInput) => void;
    disabled?: boolean;
    drop: () => void;
}

const QueueLine = (props: QueueLineProps): ReactElement => {
    const { content, index, setContent, drop } = props;

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: 'content_' + index });

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

    const item = items.find((c) => c._id === content.item) || null;
    const unit = units.find((c) => c._id === content.unit) || null;
    const vendor = companies.find((c) => c._id === content.vendor) || null;
    const destination =
        locations.find((c) => c._id === content.location) || null;
    const vendorLocation =
        locations.find((c) => c._id === content.vendor_location) || null;

    const [clickState, setClickState] = React.useState<
        | (Element &
              EventTarget & { _type: 'vendor' | 'content' | 'destination' })
        | null
    >(null);

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell {...listeners} {...attributes} sx={{ width: 40 }}>
                <Box
                    sx={{
                        display: 'flex',
                        fontSize: '2rem',
                        cursor: transform ? 'grabbing' : 'grab',
                    }}
                >
                    <MdDragHandle />
                </Box>
            </TableCell>
            <TableCell>
                <CodeField
                    naked
                    type={CodeType.PO}
                    value={content.order_code || ''}
                    onChange={(val) => {
                        setContent({ ...content, order_code: val });
                    }}
                />
            </TableCell>
            <TableCell>
                <Button
                    onClick={(event) => {
                        setClickState({
                            ...event.currentTarget,
                            _type: 'vendor',
                        });
                    }}
                    variant="text"
                    color={!content.vendor ? 'warning' : 'inherit'}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                >
                    {vendor ? (
                        <Box>
                            <Typography>{vendor.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {vendorLocation
                                    ? vendorLocation.label ||
                                      vendorLocation.address?.city
                                    : ''}
                            </Typography>
                        </Box>
                    ) : (
                        'Select a vendor'
                    )}
                </Button>
            </TableCell>

            <TableCell>
                <Button
                    onClick={(event) => {
                        setClickState({
                            ...event.currentTarget,
                            _type: 'content',
                        });
                    }}
                    variant="text"
                    color={
                        !content.item || !content.unit || !content.quantity
                            ? 'warning'
                            : 'inherit'
                    }
                    sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                >
                    {item && unit && content.quantity ? (
                        <Box>
                            <Typography>{item.english}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {`${content.quantity} ${
                                    unit[
                                        content.quantity == 1
                                            ? 'english'
                                            : 'english_plural'
                                    ]
                                }`}
                            </Typography>
                        </Box>
                    ) : (
                        'Specify contents'
                    )}
                </Button>
            </TableCell>

            <TableCell>
                <Button
                    onClick={(event) => {
                        setClickState({
                            ...event.currentTarget,
                            _type: 'destination',
                        });
                    }}
                    variant="text"
                    color={!content.location ? 'warning' : 'inherit'}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                >
                    {destination ? (
                        <Box>
                            <Typography>
                                {destination.label ||
                                    destination.address?.city ||
                                    'Unknown location'}
                            </Typography>
                        </Box>
                    ) : (
                        'Select a destination'
                    )}
                </Button>
            </TableCell>
            <TableCell sx={{ width: 120 }}>
                <DateField
                    naked
                    value={content.date || null}
                    onChange={(val) => {
                        setContent({ ...content, date: val || undefined });
                    }}
                />
            </TableCell>
            <TableCell>
                <IconButton onClick={() => drop()}>
                    <MdDelete />
                </IconButton>
            </TableCell>
            <ResponsiveDialog
                open={Boolean(clickState)}
                onClose={() => setClickState(null)}
            >
                <Box>
                    {!clickState ? (
                        ''
                    ) : clickState._type == 'content' ? (
                        <Box>
                            <FormRow>
                                <ItemField
                                    value={content.item || ''}
                                    onChange={(val) => {
                                        setContent({
                                            ...content,
                                            item: val || undefined,
                                        });
                                    }}
                                />
                            </FormRow>
                            <FormRow>
                                <NumberField
                                    value={
                                        content.quantity == undefined
                                            ? null
                                            : content.quantity
                                    }
                                    label="Quantity"
                                    onChange={(val) => {
                                        setContent({
                                            ...content,
                                            quantity: val || undefined,
                                        });
                                    }}
                                />
                                <UnitField
                                    value={content.unit || ''}
                                    onChange={(val) => {
                                        setContent({
                                            ...content,
                                            unit: val || undefined,
                                        });
                                    }}
                                />
                            </FormRow>
                        </Box>
                    ) : clickState._type == 'vendor' ? (
                        <Box>
                            <FormRow>
                                <CompanyField
                                    value={content.vendor || ''}
                                    onChange={(val) => {
                                        setContent({
                                            ...content,
                                            vendor: val || undefined,
                                            vendor_location: undefined,
                                        });
                                    }}
                                />
                            </FormRow>
                            <LocationField
                                company={content.vendor || ''}
                                value={content.vendor_location || ''}
                                onChange={(val) => {
                                    setContent({
                                        ...content,
                                        vendor_location: val || '',
                                    });
                                }}
                            />
                        </Box>
                    ) : (
                        <Box>
                            <LocationField
                                mine
                                value={content.location || ''}
                                onChange={(val) => {
                                    setContent({
                                        ...content,
                                        location: val || undefined,
                                    });
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </ResponsiveDialog>
        </TableRow>
    );
};

export default QueueLine;
