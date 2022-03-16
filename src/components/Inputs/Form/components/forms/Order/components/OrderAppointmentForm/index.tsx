import { cloneDeep } from '@apollo/client/utilities';
import { DesktopDatePicker } from '@mui/lab';
import {
    Box,
    Button,
    ClickAwayListener,
    IconButton,
    Radio,
    TextField,
    Tooltip,
    useTheme,
} from '@mui/material/';
import React, { ReactElement } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { TinyLocation } from '../../../../../../../../graphql/schema/Location/Location';
import { useLocations } from '../../../../../../../../graphql/schema/Location/useLocations';
import { OrderAppointmentInput } from '../../../../../../../../graphql/schema/OrderAppointment/OrderAppointmentInput';
import FocusedLine from '../../../../../../../feedback/FocusLine';
import EntityField from '../../../../../../EntityField';
import TimePicker from '../../../../../../TimePicker';
import OrderContentLine from './components/OrderContentLine';

export interface OrderAppointmentFormProps {
    customer: string | null;
    value: OrderAppointmentInput;
    onChange: (value: OrderAppointmentInput | null) => void;
}

const OrderAppointmentForm = (
    props: OrderAppointmentFormProps
): ReactElement => {
    const { value, onChange, customer } = props;

    const [focused, setFocused] = React.useState(false);

    const { palette, shape } = useTheme();

    return (
        <ClickAwayListener onClickAway={() => setFocused(false)}>
            <Box
                onClick={() => setFocused(true)}
                sx={{
                    ...shape,
                    background: palette.action.hover,
                    marginBottom: 2,
                    border:
                        palette.mode == 'light'
                            ? `1px solid ${palette.divider}`
                            : undefined,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                        gap: 2,
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <EntityField
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            fullWidth
                            placeholder="Destination"
                            variables={{
                                filter: {
                                    skip: 0,
                                    take: 100,
                                    company: customer || undefined,
                                },
                            }}
                            hook={useLocations}
                            getData={(res) => res.locations.items}
                            getProps={(location: TinyLocation) => ({
                                id: location._id,
                                label: location.label,
                            })}
                            value={value.location || ''}
                            onChange={(location) => {
                                onChange({ ...value, location });
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <DesktopDatePicker
                            inputFormat="MM/dd/yyyy"
                            value={value.date}
                            onChange={(date) => onChange({ ...value, date })}
                            renderInput={(params) => (
                                <TextField
                                    variant="standard"
                                    {...{
                                        ...params,
                                        InputProps: {
                                            ...params.InputProps,
                                            disableUnderline: true,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio
                                size="small"
                                checked={value.time !== null}
                                onClick={(e) => {
                                    onChange({
                                        ...value,
                                        time:
                                            value.time == null
                                                ? 7.5 * 60
                                                : null,
                                    });
                                }}
                            />
                            <TimePicker
                                disabled={value.time == null}
                                touch={() => null}
                                sx={{ width: 140 }}
                                placeholder="Time"
                                value={value.time}
                                onChange={(time) => {
                                    onChange({ ...value, time });
                                }}
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Tooltip
                            arrow
                            title="Remove delivery from order"
                            placement="right"
                        >
                            <IconButton
                                onClick={() => onChange(null)}
                                size="small"
                            >
                                <MdDelete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <FocusedLine focused={focused} />
                <Box sx={{ background: palette.tonal }}>
                    {value.contents.map((val, index) => (
                        <OrderContentLine
                            error={
                                value.contents.filter(
                                    (c) => c.item === val.item
                                ).length > 1
                                    ? new Error(
                                          'Already listed on this delivery'
                                      )
                                    : undefined
                            }
                            key={'content_' + index}
                            value={val}
                            onChange={(newVal) => {
                                const copy = cloneDeep(value);
                                if (newVal) {
                                    copy.contents[index] = newVal;
                                    onChange(copy);
                                } else {
                                    copy.contents.splice(index, 1);
                                    onChange(copy);
                                }
                            }}
                        />
                    ))}

                    <Box sx={{ p: 1 }}>
                        <Button
                            size="small"
                            variant="text"
                            startIcon={<MdAdd />}
                            onClick={() =>
                                onChange({
                                    ...value,
                                    contents: [
                                        ...value.contents,
                                        {
                                            item: '',
                                            client_quantity: null,
                                            client_unit: '',
                                        },
                                    ],
                                })
                            }
                        >
                            Delivery content
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ClickAwayListener>
    );
};

export default OrderAppointmentForm;
