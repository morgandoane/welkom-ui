import { LoadingButton } from '@mui/lab';
import { Box, Button, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import SearchField from '../../../../../../components/Forms/components/SearchField';
import TextFormField from '../../../../../../components/Forms/components/TextFormField';
import UnitClassField from '../../../../../../components/Forms/components/UnitClassField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../components/SideDrawer';
import {
    CreateItemArgs,
    CreateItemRes,
    useItemCreation,
} from '../../../../../../graphql/mutations/item/useItemCreation';
import {
    TinyItems,
    useTinyItems,
} from '../../../../../../graphql/queries/items/useTinyItems';
import { ItemFilter } from '../../../../../../graphql/schema/Item/ItemFilter';
import { UnitClass } from '../../../../../../graphql/schema/Unit/Unit';
import { OperationResult } from '../../../../../../graphql/types';

const ItemsView = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<ItemFilter>({
        skip: 0,
        take: 20,
    });

    const { data, error, loading } = useTinyItems({ variables: { filter } });

    const count = data ? data.items.count : 0;
    const items = data ? data.items.items : [];

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
                    header: (
                        <Box
                            sx={{
                                display: 'flex',
                                paddingBottom: 2,
                                alignItems: 'flex-end',
                            }}
                        >
                            <Box>
                                <PageTitle>Items</PageTitle>
                                <SearchField
                                    label="Search"
                                    value={filter.name || ''}
                                    onChange={(val) => {
                                        setFilter({
                                            ...filter,
                                            name: val || '',
                                        });
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }} />
                            <Box>
                                <Box>
                                    <Button
                                        onClick={() =>
                                            setEdits({
                                                english: '',
                                                spanish: '',
                                                unit_class: UnitClass.Weight,
                                            })
                                        }
                                        startIcon={<MdAdd />}
                                    >
                                        Item
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ),
                    content: (
                        <DataGrid
                            onRowClick={(params) => nav(params.row.id)}
                            loading={loading}
                            rowsPerPageOptions={[50]}
                            paginationMode="server"
                            pageSize={filter.take}
                            rowCount={count}
                            rows={items.map((c) => ({ ...c, id: c._id }))}
                            columns={[
                                {
                                    field: 'english',
                                    width: 200,
                                    headerName: 'English name',
                                },
                                {
                                    field: 'spanish',
                                    width: 200,
                                    headerName: 'Spanish name',
                                },
                            ]}
                            onPageChange={(page) => {
                                setFilter({
                                    ...filter,
                                    skip: page == 0 ? 0 : filter.take * page,
                                });
                            }}
                        />
                    ),
                }}
            </ColumnBox>
            <SideDrawer
                open={Boolean(edits)}
                onClose={onClose}
                error={
                    result && result.success == false ? result.error : undefined
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
                            if (edits) setEdits({ ...edits, unit_class });
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
