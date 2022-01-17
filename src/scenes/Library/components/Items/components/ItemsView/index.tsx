import { LoadingButton } from '@mui/lab';
import { Box, Button, Collapse, Fab } from '@mui/material';
import { format, setDate } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import CompanyField from '../../../../../../components/Forms/components/CompanyField';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import NumberField from '../../../../../../components/Forms/components/NumberField';
import TextFormField from '../../../../../../components/Forms/components/TextFormField';
import UnitClassField from '../../../../../../components/Forms/components/UnitClassField';
import UnitField from '../../../../../../components/Forms/components/UnitField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../components/SideDrawer';
import SmartTable from '../../../../../../components/SmartTable';
import {
    CreateItemArgs,
    CreateItemRes,
    useItemCreation,
} from '../../../../../../graphql/mutations/item/useItemCreation';
import {
    TinyItems,
    useTinyItems,
} from '../../../../../../graphql/queries/items/useTinyItems';
import { TinyItem } from '../../../../../../graphql/schema/Item/Item';
import { ItemFilter } from '../../../../../../graphql/schema/Item/ItemFilter';
import { UnitClass } from '../../../../../../graphql/schema/Unit/Unit';
import { OperationResult } from '../../../../../../graphql/types';
import { dateFormats } from '../../../../../../utils/dateFormats';

const ItemsView = (): ReactElement => {
    const nav = useNavigate();

    const skipFromState = localStorage.getItem('library_items_skip');
    const skipParsed = !skipFromState
        ? 0
        : isNaN(parseInt(skipFromState))
        ? 0
        : parseInt(skipFromState);

    const [filter, setFilter] = React.useState<ItemFilter>({
        skip: skipParsed,
        take: 50,
    });

    React.useEffect(() => {
        localStorage.setItem('library_items_skip', filter.skip.toString());
    }, [filter]);

    const [{ items, count }, setData] = React.useState<{
        count: number;
        items: TinyItem[];
    }>({
        count: 0,
        items: [],
    });

    const { error, loading } = useTinyItems({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: ({ items }) =>
            setData({
                count: items.count,
                items: items.items,
            }),
    });

    const [result, setResult] =
        React.useState<OperationResult<CreateItemRes> | null>(null);

    const [edits, setEdits] = React.useState<CreateItemArgs['data'] | null>(
        null
    );

    const [create, { loading: createLoading }] = useItemCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [TinyItems],
    });

    const onClose = () => {
        setEdits(null);
        setResult(null);
    };

    return (
        <AppNav loading={loading} error={error}>
            <ColumnBox>
                {{
                    header: <PageTitle>Items</PageTitle>,
                    content: (
                        <SmartTable
                            data={items}
                            getProps={(item) => ({
                                id: item._id,
                                onClick: (item, event) => nav(item._id),
                            })}
                            pagination={{
                                count,
                                skip: filter.skip,
                                take: filter.take,
                                setPage: (p: number) => {
                                    setFilter({
                                        ...filter,
                                        skip:
                                            p == 1 ? 0 : (p - 1) * filter.take,
                                    });
                                },
                            }}
                            search={{
                                label: 'Search by name',
                                value: filter.name || '',
                                setValue: (d) =>
                                    setFilter({ ...filter, name: d, skip: 0 }),
                            }}
                            action={
                                <Button
                                    startIcon={<MdAdd />}
                                    onClick={() => {
                                        setEdits({
                                            english: '',
                                            spanish: '',
                                            unit_class: UnitClass.Weight,
                                            to_base_unit: 1,
                                        });
                                    }}
                                >
                                    Item
                                </Button>
                            }
                        >
                            {{
                                Name: (d) => d.english,
                                Spanish: (d) => d.spanish,
                                ['Measured in']: (d) => d.unit_class,
                                ['Created by']: (d) =>
                                    d.created_by.name +
                                    ' - ' +
                                    format(
                                        new Date(d.date_created),
                                        dateFormats.condensedDate
                                    ),

                                ['Last modified']: (d) =>
                                    d.modified_by && d.date_modified
                                        ? d.modified_by.name +
                                          ' - ' +
                                          format(
                                              new Date(d.date_modified),
                                              dateFormats.condensedDate
                                          )
                                        : '',
                            }}
                        </SmartTable>
                    ),
                }}
            </ColumnBox>
            <SideDrawer
                open={Boolean(edits)}
                onClose={onClose}
                error={
                    result && result.success == false ? result.error : undefined
                }
                resetError={
                    <Button onClick={() => setResult(null)}>Reset form</Button>
                }
                success={
                    result && result.success == true
                        ? 'Item created!'
                        : undefined
                }
                onSuccess={() => {
                    if (result && result.success == true) {
                        setEdits(null);
                        setResult(null);
                        nav(result.data.createItem._id);
                    }
                }}
            >
                <PanelHeader onClose={onClose}>Create item</PanelHeader>
                <FormRow>
                    <TextFormField
                        label="English"
                        value={edits ? edits.english : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({ ...edits, english: val || '' });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <TextFormField
                        label="Spanish"
                        value={edits ? edits.spanish : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({ ...edits, spanish: val || '' });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <UnitClassField
                        label="Measured in"
                        value={edits ? edits.unit_class : UnitClass.Weight}
                        onChange={(unit_class) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    unit_class,
                                    default_unit: undefined,
                                });
                        }}
                    />
                </FormRow>
                <Collapse
                    in={edits !== null && edits.unit_class == UnitClass.Volume}
                >
                    <FormRow>
                        <NumberField
                            label={`How much does 1 gallon of ${
                                edits && edits.english
                                    ? edits.english
                                    : 'this item'
                            } weigh? (pounds)`}
                            value={edits ? edits.to_base_unit : 1}
                            onChange={(val) => {
                                if (edits)
                                    setEdits({
                                        ...edits,
                                        to_base_unit: val !== null ? val : 0,
                                    });
                            }}
                        />
                    </FormRow>
                </Collapse>
                <FormRow>
                    <UnitField
                        class={edits ? edits.unit_class : undefined}
                        label="Default unit"
                        value={edits ? edits.default_unit || '' : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    default_unit: val || '',
                                });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <CompanyField
                        label="Default vendor"
                        value={edits ? edits.default_vendor || '' : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    default_vendor: val || '',
                                });
                        }}
                    />
                </FormRow>
                <LoadingButton
                    variant="contained"
                    loading={createLoading}
                    onClick={() => {
                        if (edits) create({ variables: { data: edits } });
                    }}
                >
                    Create!
                </LoadingButton>
            </SideDrawer>
        </AppNav>
    );
};

export default ItemsView;
