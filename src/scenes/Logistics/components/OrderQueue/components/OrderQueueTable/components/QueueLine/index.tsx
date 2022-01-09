import {
    Button,
    IconButton,
    Popover,
    TableCell,
    TableRow,
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

    const companies = companyData ? companyData.companies.items : [];

    const vendor = companies.find((c) => c._id === content.vendor) || null;

    const [clickState, setClickState] = React.useState<
        (Element & EventTarget & { _type: 'vendor' | 'content' }) | null
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
            <TableCell sx={{ width: 120 }}>
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
                >
                    {vendor ? vendor.name : 'Select a vendor'}
                </Button>
            </TableCell>
            <TableCell>
                <LocationField
                    naked
                    company={content.vendor || ''}
                    value={content.vendor_location || ''}
                    onChange={(val) => {
                        setContent({
                            ...content,
                            vendor_location: val || undefined,
                        });
                    }}
                />
            </TableCell>
            <TableCell>
                <ItemField
                    naked
                    value={content.item || ''}
                    onChange={(val) => {
                        setContent({ ...content, item: val || undefined });
                    }}
                />
            </TableCell>
            <TableCell sx={{ width: 60 }}>
                <NumberField
                    naked
                    value={
                        content.quantity == undefined ? null : content.quantity
                    }
                    label="Quantity"
                    onChange={(val) => {
                        setContent({ ...content, quantity: val || undefined });
                    }}
                />
            </TableCell>
            <TableCell>
                <UnitField
                    naked
                    value={content.unit || ''}
                    onChange={(val) => {
                        setContent({ ...content, unit: val || undefined });
                    }}
                />
            </TableCell>
            <TableCell>
                <LocationField
                    naked
                    mine
                    value={content.location || ''}
                    onChange={(val) => {
                        setContent({ ...content, location: val || undefined });
                    }}
                />
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
            <Popover
                anchorEl={clickState}
                open={Boolean(clickState)}
                onClose={() => setClickState(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {!clickState ? (
                    ''
                ) : clickState._type == 'content' ? (
                    <Box sx={{ p: 1 }}></Box>
                ) : (
                    <Box sx={{ p: 1 }}>
                        <CompanyField
                            naked
                            value={content.vendor || ''}
                            onChange={(val) => {
                                setContent({
                                    ...content,
                                    vendor: val || undefined,
                                    vendor_location: undefined,
                                });
                            }}
                        />
                    </Box>
                )}
                <Box></Box>
            </Popover>
        </TableRow>
    );
};

export default QueueLine;
