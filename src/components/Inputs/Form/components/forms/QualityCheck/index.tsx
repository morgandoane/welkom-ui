import { cloneDeep } from '@apollo/client/utilities';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    FormControlLabel,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
    useTheme,
    Switch,
    Collapse,
    ListItemText,
    Button,
    IconButton,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck, MdClear, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
    QualityCheckCategory,
    QualityCheckClass,
} from '../../../../../../graphql/inputsTypes';
import {
    CreateQualityCheckArgs,
    UpdateQualityCheckArgs,
} from '../../../../../../graphql/mutationArgs';
import { NumberRange } from '../../../../../../graphql/schema/Range/NumberRange/NumberRange';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import ItemSelection from '../../../../ItemSelection';
import { EntityFormProps } from '../../AppForm';

const QualityCheckFormRender = (
    props: EntityFormProps<CreateQualityCheckArgs, UpdateQualityCheckArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (value.data.item == '')
            return 'If quality check is item specific, please select an item.';
        if (!value.data.prompt.english)
            return 'Please enter an english prompt.';
        if (!value.data.prompt.spanish)
            return 'Please enter an spanish prompt.';
        if (
            value.data.quality_check_class == QualityCheckClass.Options &&
            (!value.data.options || value.data.options.length == 0)
        )
            return 'Please provide options to select.';

        if (value.data.options) {
            if (value.data.options.some((op) => !op.value))
                return 'Please provide a value for each option.';
            if (value.data.options.every((op) => !op.acceptable))
                return 'At least one option needs to be acceptable.';
        }

        return null;
    };

    const holdup = getHoldup();

    const categoryDescriptions: Record<QualityCheckCategory, string> = {
        [QualityCheckCategory.Production]: 'Asked when an item is produced.',
        [QualityCheckCategory.Receipt]: 'Asked when an item is received.',
        [QualityCheckCategory.Shipment]: 'Asked when an item is shipped.',
    };

    const getRangeError = (): boolean => {
        if (value.data.number_range == null) return false;
        const range = value.data.number_range as NumberRange;
        if (range.min !== null && range.max !== null) {
            if (range.max < range.min) return true;
        }
        return false;
    };

    return (
        <NavContent>
            {{
                header: (
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            gap: 1,
                        }}
                    >
                        <Box>
                            <BackButton
                                onClick={() => {
                                    if (value._type == 'create') {
                                        nav(`/library/qualitychecks`);
                                    } else {
                                        nav(
                                            `/library/qualitychecks/${value.id}`
                                        );
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Quality Check'
                                    : 'Quality Checks'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Quality Check'
                                : 'Update Quality Check'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 800 }}>
                        <FormRow p={3}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={value.data.item !== null}
                                        name="item specific"
                                        onChange={(e, checked) => {
                                            if (value._type == 'create')
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        item: checked
                                                            ? ''
                                                            : null,
                                                    },
                                                });
                                            else
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        item: checked
                                                            ? ''
                                                            : null,
                                                    },
                                                });
                                        }}
                                    />
                                }
                                label="Item Specific"
                            />
                        </FormRow>
                        <Collapse in={value.data.item !== null}>
                            <FormRow p={3}>
                                <ItemSelection
                                    value={value.data.item || ''}
                                    onChange={(val) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    item: val,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    item: val,
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                        </Collapse>
                        <Box sx={{ maxWidth: 600 }}>
                            <FormRow p={3}>
                                <TextField
                                    label="Category"
                                    fullWidth
                                    value={value.data.quality_check_category}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    quality_check_category: e
                                                        .target
                                                        .value as QualityCheckCategory,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    quality_check_category: e
                                                        .target
                                                        .value as QualityCheckCategory,
                                                },
                                            });
                                    }}
                                    select
                                >
                                    {Object.keys(QualityCheckCategory).map(
                                        (key) => (
                                            <MenuItem
                                                key={'cat_' + key}
                                                value={key}
                                            >
                                                <ListItemText
                                                    primary={key}
                                                    secondary={
                                                        categoryDescriptions[
                                                            key as QualityCheckCategory
                                                        ]
                                                    }
                                                />
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    label="Response type"
                                    fullWidth
                                    value={value.data.quality_check_class}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    quality_check_class: e
                                                        .target
                                                        .value as QualityCheckClass,
                                                    number_range: null,
                                                    options:
                                                        (e.target
                                                            .value as QualityCheckClass) ===
                                                        QualityCheckClass.Options
                                                            ? [
                                                                  {
                                                                      value: '',
                                                                      acceptable:
                                                                          true,
                                                                  },
                                                              ]
                                                            : null,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    quality_check_class: e
                                                        .target
                                                        .value as QualityCheckClass,
                                                    number_range: null,
                                                    options:
                                                        (e.target
                                                            .value as QualityCheckClass) ===
                                                        QualityCheckClass.Options
                                                            ? [
                                                                  {
                                                                      value: '',
                                                                      acceptable:
                                                                          true,
                                                                  },
                                                              ]
                                                            : null,
                                                },
                                            });
                                    }}
                                    select
                                >
                                    {Object.keys(QualityCheckClass).map(
                                        (key) => (
                                            <MenuItem
                                                key={'class_' + key}
                                                value={key}
                                            >
                                                {key}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    label="Prompt (english)"
                                    fullWidth
                                    value={value.data.prompt.english}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    prompt: {
                                                        ...value.data.prompt,
                                                        english:
                                                            e.target.value ||
                                                            '',
                                                    },
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    prompt: {
                                                        ...value.data.prompt,
                                                        english:
                                                            e.target.value ||
                                                            '',
                                                    },
                                                },
                                            });
                                    }}
                                />
                                <TextField
                                    label="Prompt (spanish)"
                                    fullWidth
                                    value={value.data.prompt.spanish}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    prompt: {
                                                        ...value.data.prompt,
                                                        spanish:
                                                            e.target.value ||
                                                            '',
                                                    },
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    prompt: {
                                                        ...value.data.prompt,
                                                        spanish:
                                                            e.target.value ||
                                                            '',
                                                    },
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <Collapse
                                in={
                                    value.data.quality_check_class ===
                                    QualityCheckClass.Options
                                }
                            >
                                <FormRow p={3}>
                                    <Box
                                        sx={{
                                            flex: 1,
                                            ...shape,
                                            border: `1px solid ${palette.divider}`,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 1,
                                                paddingLeft: 1.5,
                                                background:
                                                    palette.action.focus,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                Options
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 1,
                                                background:
                                                    palette.background.default,
                                            }}
                                        >
                                            <Box>
                                                {(value.data.options || []).map(
                                                    (option, opIndex) => (
                                                        <Box
                                                            key={
                                                                'op_' + opIndex
                                                            }
                                                            sx={{
                                                                paddingLeft: 1,
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{ flex: 1 }}
                                                            >
                                                                <TextField
                                                                    value={
                                                                        option.value
                                                                    }
                                                                    placeholder="Option value"
                                                                    variant="standard"
                                                                    fullWidth
                                                                    InputProps={{
                                                                        disableUnderline:
                                                                            true,
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const copy =
                                                                            cloneDeep(
                                                                                value
                                                                            );

                                                                        if (
                                                                            copy
                                                                                .data
                                                                                .options
                                                                        ) {
                                                                            copy.data.options[
                                                                                opIndex
                                                                            ].value =
                                                                                e
                                                                                    .target
                                                                                    .value ||
                                                                                '';

                                                                            onChange(
                                                                                copy
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={
                                                                                option.acceptable
                                                                            }
                                                                            name="acceptable"
                                                                            onChange={(
                                                                                e,
                                                                                checked
                                                                            ) => {
                                                                                const copy =
                                                                                    cloneDeep(
                                                                                        value
                                                                                    );

                                                                                if (
                                                                                    copy
                                                                                        .data
                                                                                        .options
                                                                                ) {
                                                                                    copy.data.options[
                                                                                        opIndex
                                                                                    ].acceptable =
                                                                                        checked;

                                                                                    onChange(
                                                                                        copy
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                    label="Acceptable"
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <IconButton
                                                                    onClick={() => {
                                                                        const copy =
                                                                            cloneDeep(
                                                                                value
                                                                            );
                                                                        if (
                                                                            copy
                                                                                .data
                                                                                .options
                                                                        ) {
                                                                            copy.data.options.splice(
                                                                                opIndex,
                                                                                1
                                                                            );
                                                                            onChange(
                                                                                copy
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <MdClear />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    )
                                                )}
                                            </Box>
                                            <Button
                                                variant="text"
                                                startIcon={<MdAdd />}
                                                onClick={() => {
                                                    if (value.data.options) {
                                                        if (
                                                            value._type ==
                                                            'create'
                                                        )
                                                            onChange({
                                                                ...value,
                                                                data: {
                                                                    ...value.data,
                                                                    options: [
                                                                        ...value
                                                                            .data
                                                                            .options,
                                                                        {
                                                                            value: '',
                                                                            acceptable:
                                                                                true,
                                                                        },
                                                                    ],
                                                                },
                                                            });
                                                    }
                                                }}
                                            >
                                                Option
                                            </Button>
                                        </Box>
                                    </Box>
                                </FormRow>
                            </Collapse>
                            <Collapse
                                in={
                                    value.data.quality_check_class ===
                                        QualityCheckClass.Number &&
                                    value.data.number_range !== null
                                }
                            >
                                <FormRow p={3}>
                                    <TextField
                                        label="Min"
                                        fullWidth
                                        type="number"
                                        value={
                                            value.data.number_range?.min || ''
                                        }
                                        onChange={(e) => {
                                            if (value.data.number_range) {
                                                const parsed = parseFloat(
                                                    e.target.value
                                                );
                                                if (value._type == 'create')
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            number_range: {
                                                                ...value.data
                                                                    .number_range,
                                                                min: isNaN(
                                                                    parsed
                                                                )
                                                                    ? null
                                                                    : parsed,
                                                            },
                                                        },
                                                    });
                                                else
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            number_range: {
                                                                ...value.data
                                                                    .number_range,
                                                                min: isNaN(
                                                                    parsed
                                                                )
                                                                    ? null
                                                                    : parsed,
                                                            },
                                                        },
                                                    });
                                            }
                                        }}
                                    />
                                    <TextField
                                        error={getRangeError()}
                                        label="Max"
                                        fullWidth
                                        type="number"
                                        value={
                                            value.data.number_range?.max || ''
                                        }
                                        onChange={(e) => {
                                            if (value.data.number_range) {
                                                const parsed = parseFloat(
                                                    e.target.value
                                                );
                                                if (value._type == 'create')
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            number_range: {
                                                                ...value.data
                                                                    .number_range,
                                                                max: isNaN(
                                                                    parsed
                                                                )
                                                                    ? null
                                                                    : parsed,
                                                            },
                                                        },
                                                    });
                                                else
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            number_range: {
                                                                ...value.data
                                                                    .number_range,
                                                                max: isNaN(
                                                                    parsed
                                                                )
                                                                    ? null
                                                                    : parsed,
                                                            },
                                                        },
                                                    });
                                            }
                                        }}
                                    />
                                </FormRow>
                            </Collapse>
                            <Collapse
                                in={
                                    value.data.quality_check_class ===
                                    QualityCheckClass.Number
                                }
                            >
                                <FormRow p={1}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={
                                                    value.data.number_range !==
                                                    null
                                                }
                                                onChange={(e, val) => {
                                                    if (value._type == 'create')
                                                        onChange({
                                                            ...value,
                                                            data: {
                                                                ...value.data,
                                                                number_range:
                                                                    val
                                                                        ? {
                                                                              min: 0,
                                                                              max: 10,
                                                                          }
                                                                        : null,
                                                            },
                                                        });
                                                    else
                                                        onChange({
                                                            ...value,
                                                            data: {
                                                                ...value.data,
                                                                number_range:
                                                                    val
                                                                        ? {
                                                                              min: 0,
                                                                              max: 10,
                                                                          }
                                                                        : null,
                                                            },
                                                        });
                                                }}
                                                name="validation"
                                            />
                                        }
                                        label="Validation range"
                                    />
                                </FormRow>
                            </Collapse>
                            <FormRow p={3}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={value.data.required}
                                            onChange={(e, required) => {
                                                if (value._type == 'create')
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            required,
                                                        },
                                                    });
                                                else
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            required,
                                                        },
                                                    });
                                            }}
                                            name="required"
                                        />
                                    }
                                    label="Required"
                                />
                            </FormRow>
                        </Box>
                        <FormRow>
                            <Box>
                                <Tooltip title={holdup || ''} arrow>
                                    <Box>
                                        <LoadingButton
                                            onClick={() => submit()}
                                            variant="contained"
                                            disabled={Boolean(holdup)}
                                            endIcon={<MdCheck />}
                                            loading={loading}
                                        >
                                            Save
                                        </LoadingButton>
                                    </Box>
                                </Tooltip>
                            </Box>
                            {value._type == 'update' && (
                                <CarefullButton
                                    endIcon={<MdDelete />}
                                    onClick={() => {
                                        submit(true);
                                    }}
                                >
                                    Delete quality check
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default QualityCheckFormRender;
