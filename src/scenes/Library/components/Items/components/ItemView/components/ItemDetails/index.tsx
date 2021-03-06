import { LoadingButton } from '@mui/lab';
import { Box, useTheme } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdEdit } from 'react-icons/md';
import AppFab from '../../../../../../../../components/AppFab';
import Details from '../../../../../../../../components/Details';
import CarefulButton from '../../../../../../../../components/Forms/CarefulButton';
import FormRow from '../../../../../../../../components/Forms/components/FormRow';
import TextFormField from '../../../../../../../../components/Forms/components/TextFormField';
import PanelHeader from '../../../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../../../components/SideDrawer';
import {
    UpdateItemArgs,
    UpdateItemRes,
    useItemUpdate,
} from '../../../../../../../../graphql/mutations/item/useItemUpdate';
import {
    Item,
    ItemType,
} from '../../../../../../../../graphql/schema/Item/Item';
import { OperationResult } from '../../../../../../../../graphql/types';
import { dateFormats } from '../../../../../../../../utils/dateFormats';
import { MdRefresh } from 'react-icons/md';
import UnitField from '../../../../../../../../components/Forms/components/UnitField';
import CompanyField from '../../../../../../../../components/Forms/components/CompanyField';
import ItemCategoryField from '../../../../../../../../components/Forms/components/ItemCategoryField';

export interface ItemDetailsProps {
    item: Item;
    refetch: () => void;
}

const ItemDetails = (props: ItemDetailsProps): ReactElement => {
    const theme = useTheme();
    const { item, refetch } = props;

    const [state, setState] = React.useState<UpdateItemArgs | null>(null);

    const [result, setResult] =
        React.useState<OperationResult<UpdateItemRes> | null>(null);

    const [update, { loading }] = useItemUpdate({
        onCompleted: (data) => {
            setResult({ success: true, data });
            refetch();
        },
        onError: (error) => setResult({ success: false, error }),
    });

    const onClose = () => {
        setResult(null);
        setState(null);
    };

    return (
        <Box sx={{ paddingTop: 4 }}>
            <Details gap={4}>
                {[
                    { key: 'Name', value: item.english },
                    {
                        key: 'Category',
                        value: item.category
                            ? item.category.label
                            : 'Uncategorized',
                    },
                    { key: 'Created by', value: item.created_by.name },
                    {
                        key: 'Date created',
                        value: format(
                            new Date(item.date_created),
                            dateFormats.condensedDate
                        ),
                    },
                    {
                        key: 'Last modified by',
                        value: !item.modified_by ? '-' : item.modified_by.name,
                    },
                    {
                        key: 'Date modified',
                        value: !item.date_modified
                            ? 'Never'
                            : format(
                                  new Date(item.date_modified),
                                  dateFormats.condensedDate
                              ),
                    },
                ]}
            </Details>

            {item.deleted ? (
                <AppFab
                    disabled={loading}
                    sx={{
                        backgroundColor: theme.palette.error.main,
                        '&:hover': {
                            backgroundColor: theme.palette.error.dark,
                        },
                    }}
                    icon={<MdRefresh />}
                    onClick={() => {
                        update({
                            variables: {
                                id: item._id,
                                data: {
                                    english: item.english,
                                    spanish: item.spanish,
                                    deleted: false,
                                    unit_class: item.unit_class,
                                    type: item.type,
                                    default_vendor:
                                        item.default_vendor?._id || undefined,
                                    default_unit:
                                        item.default_unit?._id || undefined,
                                    to_base_unit: item.to_base_unit,
                                },
                            },
                        });
                    }}
                >
                    Reinstate
                </AppFab>
            ) : (
                <AppFab
                    icon={<MdEdit />}
                    onClick={() => {
                        setState({
                            id: item._id,
                            data: {
                                english: item.english,
                                spanish: item.spanish,
                                deleted: false,
                                unit_class: item.unit_class,
                                default_vendor:
                                    item.default_vendor?._id || undefined,
                                default_unit:
                                    item.default_unit?._id || undefined,
                                upc: item.upc,
                                to_base_unit: item.to_base_unit,
                                category: item.category
                                    ? item.category._id
                                    : null,
                            },
                        });
                    }}
                >
                    Edit
                </AppFab>
            )}
            <SideDrawer
                loading={loading}
                open={Boolean(state)}
                onClose={onClose}
                error={
                    result && result.success == false ? result.error : undefined
                }
                success={
                    result && result.success == true ? 'Item saved' : undefined
                }
            >
                <PanelHeader
                    onClose={onClose}
                >{`Update ${item.english}`}</PanelHeader>
                <Box p={1} />
                <FormRow>
                    <TextFormField
                        disabled={loading}
                        label="Name"
                        value={state ? state.data.english || '' : ''}
                        onChange={(val) => {
                            if (state)
                                setState({
                                    ...state,
                                    data: { ...state.data, english: val || '' },
                                });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <ItemCategoryField
                        onChange={(category) => {
                            if (state)
                                setState({
                                    ...state,
                                    data: { ...state.data, category },
                                });
                        }}
                        value={
                            state
                                ? state.data.category === null
                                    ? null
                                    : state.data.category || null
                                : null
                        }
                    />
                </FormRow>
                {item && item.type === ItemType.Product && (
                    <FormRow>
                        <TextFormField
                            label="UPC"
                            value={state ? state.data.upc || '' || '' : ''}
                            onChange={(val) => {
                                if (state)
                                    setState({
                                        ...state,
                                        data: { ...state.data, upc: val || '' },
                                    });
                            }}
                        />
                    </FormRow>
                )}
                {item.type !== ItemType.Product && (
                    <FormRow>
                        <UnitField
                            class={state ? state.data.unit_class : undefined}
                            label="Default unit"
                            value={state ? state.data.default_unit || '' : ''}
                            onChange={(val) => {
                                if (state)
                                    setState({
                                        ...state,
                                        data: {
                                            ...state.data,
                                            default_unit: val || '',
                                        },
                                    });
                            }}
                        />
                    </FormRow>
                )}
                {item.type !== ItemType.Product && (
                    <FormRow>
                        <CompanyField
                            label="Default vendor"
                            value={state ? state.data.default_vendor || '' : ''}
                            onChange={(val) => {
                                if (state)
                                    setState({
                                        ...state,
                                        data: {
                                            ...state.data,
                                            default_vendor: val || '',
                                        },
                                    });
                            }}
                        />
                    </FormRow>
                )}
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CarefulButton
                            disabled={loading}
                            onClick={() => {
                                if (state) {
                                    const variables = { ...state };
                                    variables.data.deleted = true;
                                    setState(variables);
                                    update({ variables });
                                }
                            }}
                        >
                            Delete
                        </CarefulButton>
                    </Box>
                    <Box sx={{ flex: 1 }} />
                    <LoadingButton
                        onClick={() => {
                            if (state) update({ variables: state });
                        }}
                        variant="contained"
                        loading={loading}
                        disabled={
                            !state ||
                            !state.data.english ||
                            !state.data.spanish ||
                            (item.type == ItemType.Product && !state.data.upc)
                        }
                    >
                        Save
                    </LoadingButton>
                </Box>
            </SideDrawer>
        </Box>
    );
};

export default ItemDetails;
