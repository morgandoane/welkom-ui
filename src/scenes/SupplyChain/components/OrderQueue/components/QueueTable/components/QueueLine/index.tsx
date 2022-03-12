import { cloneDeep } from '@apollo/client/utilities';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { ReactElement } from 'react';
import EntityField from '../../../../../../../../components/Inputs/EntityField';
import { TinyCompany } from '../../../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../../../graphql/schema/Company/useCompanies';
import { TinyItem } from '../../../../../../../../graphql/schema/Item/Item';
import { useItems } from '../../../../../../../../graphql/schema/Item/useItems';
import { TinyLocation } from '../../../../../../../../graphql/schema/Location/Location';
import { useLocations } from '../../../../../../../../graphql/schema/Location/useLocations';
import { OrderQueueLineInput } from '../../../../../../../../graphql/schema/OrderQueueLine/OrderQueueLineInput';
import { TinyUnit } from '../../../../../../../../graphql/schema/Unit/Unit';
import { useUnits } from '../../../../../../../../graphql/schema/Unit/useUnits';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import IconButton from '@mui/material/IconButton';
import { MdDelete, MdDragHandle, MdRefresh } from 'react-icons/md';
import {
    CodeType,
    useCode,
} from '../../../../../../../../graphql/schema/Code/useCode';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Radio, useTheme } from '@mui/material/';
import TimePicker from '../../../../../../../../components/Inputs/TimePicker';

export interface QueueLineProps {
    line: OrderQueueLineInput;
    setLine: (value: OrderQueueLineInput | null) => void;
    index: number;
    touch: () => void;
}

const QueueLine = (props: QueueLineProps): ReactElement => {
    const { line, setLine, touch, index } = props;

    const { palette } = useTheme();

    const selectprops: TextFieldProps = {
        size: 'small',
        variant: 'standard',
        InputProps: { disableUnderline: true },
        fullWidth: true,
    };

    const { loading } = useCode(CodeType.PO, line.po !== null, (po) => {
        setLine({ ...line, po });
    });

    const cellProps = {
        sx: {
            background: palette.tonal,
            '.MuiSelect-icon': {
                display: 'none',
            },
        },
    };

    return (
        <Draggable draggableId={'line_' + index} index={index}>
            {(provided, snapshot) => (
                <TableRow ref={provided.innerRef} {...provided.draggableProps}>
                    <TableCell
                        {...provided.dragHandleProps}
                        {...cellProps}
                        sx={{
                            ...cellProps.sx,
                            background: palette.background.paper,
                        }}
                    >
                        <MdDragHandle
                            style={{
                                fontSize: '2rem',
                                color: palette.text.secondary,
                            }}
                        />
                    </TableCell>
                    <TableCell
                        {...cellProps}
                        sx={{
                            ...cellProps.sx,
                            background: palette.background.paper,
                        }}
                    >
                        <EntityField
                            {...selectprops}
                            placeholder={'Item'}
                            hook={useItems}
                            variables={{ filter: { skip: 0, take: 100 } }}
                            getData={(res) => res.items.items}
                            getProps={(d: TinyItem) => ({
                                id: d._id,
                                label: d.names.english,
                            })}
                            value={line.item || ''}
                            onChange={(value) => {
                                const copy = cloneDeep(line);
                                copy.item = value;
                                setLine(copy);
                            }}
                        />
                    </TableCell>
                    <TableCell
                        {...cellProps}
                        sx={{
                            ...cellProps.sx,
                            background: palette.background.paper,
                        }}
                    >
                        <TextField
                            sx={{ width: 80 }}
                            placeholder="Qty"
                            type="number"
                            {...selectprops}
                            value={line.quantity == null ? '' : line.quantity}
                            onChange={(e) => {
                                if (!e.target.value) {
                                    const copy = cloneDeep(line);
                                    copy.quantity = null;
                                    setLine(copy);
                                } else {
                                    const parsed = parseFloat(e.target.value);
                                    const copy = cloneDeep(line);
                                    copy.quantity = parsed;
                                    setLine(copy);
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell
                        {...cellProps}
                        sx={{
                            ...cellProps.sx,
                            background: palette.background.paper,
                        }}
                    >
                        <EntityField
                            {...selectprops}
                            placeholder={'Unit'}
                            hook={useUnits}
                            variables={{ filter: { skip: 0, take: 100 } }}
                            getData={(res) => res.units.items}
                            getProps={(d: TinyUnit) => ({
                                id: d._id,
                                label: d.names.english,
                            })}
                            value={line.unit || ''}
                            onChange={(value) => {
                                const copy = cloneDeep(line);
                                copy.unit = value;
                                setLine(copy);
                            }}
                        />
                    </TableCell>
                    <TableCell {...cellProps}>
                        <TextField
                            placeholder="PO#"
                            sx={{ width: 120, paddingLeft: '12px' }}
                            {...selectprops}
                            InputProps={{
                                ...selectprops.InputProps,
                                endAdornment: loading ? (
                                    <InputAdornment position="end">
                                        <CircularProgress size={20} />
                                    </InputAdornment>
                                ) : (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{
                                                color: palette.text.disabled,
                                            }}
                                            size="small"
                                            onClick={() =>
                                                setLine({ ...line, po: null })
                                            }
                                        >
                                            <MdRefresh />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            value={line.po}
                            onChange={(e) => {
                                setLine({
                                    ...line,
                                    po: e.target.value,
                                });
                            }}
                        />
                    </TableCell>
                    <TableCell {...cellProps}>
                        <EntityField
                            {...selectprops}
                            placeholder={'Vendor'}
                            hook={useCompanies}
                            variables={{ filter: { skip: 0, take: 100 } }}
                            getData={(res) => res.companies.items}
                            getProps={(d: TinyCompany) => ({
                                id: d._id,
                                label: d.name,
                            })}
                            value={line.vendor || ''}
                            onChange={(value) => {
                                const copy = cloneDeep(line);
                                copy.vendor = value;
                                setLine(copy);
                            }}
                        />
                    </TableCell>
                    <TableCell {...cellProps}>
                        <EntityField
                            {...selectprops}
                            placeholder={'Location'}
                            hook={useLocations}
                            variables={{
                                filter: {
                                    skip: 0,
                                    take: 100,
                                    company: line.customer || undefined,
                                },
                            }}
                            getData={(res) => res.locations.items}
                            getProps={(d: TinyLocation) => ({
                                id: d._id,
                                label: d.label,
                            })}
                            value={line.destination || ''}
                            onChange={(value) => {
                                const copy = cloneDeep(line);
                                copy.destination = value;
                                setLine(copy);
                            }}
                        />
                    </TableCell>
                    <TableCell {...cellProps}>
                        <DesktopDatePicker
                            inputFormat="MM/dd/yyyy"
                            value={line.date}
                            onChange={(date) => {
                                const copy = cloneDeep(line);
                                copy.date = date;
                                setLine(copy);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ width: 140 }}
                                    variant="standard"
                                    InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                    }}
                                />
                            )}
                        />
                    </TableCell>
                    <TableCell {...cellProps}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio
                                size="small"
                                checked={line.time !== null}
                                onClick={(e) => {
                                    setLine({
                                        ...line,
                                        time:
                                            line.time == null ? 7.5 * 60 : null,
                                    });
                                }}
                            />
                            <TimePicker
                                {...selectprops}
                                disabled={line.time == null}
                                touch={touch}
                                sx={{ width: 140 }}
                                placeholder="Time"
                                value={line.time}
                                onChange={(time) => {
                                    setLine({ ...line, time });
                                }}
                            />
                        </Box>
                    </TableCell>
                    <TableCell {...cellProps}>
                        <IconButton
                            onClick={() => setLine(null)}
                            sx={{
                                color: palette.text.disabled,
                            }}
                        >
                            <MdDelete />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )}
        </Draggable>
    );
};

export default QueueLine;
