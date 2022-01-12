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
    CreateUnitArgs,
    CreateUnitRes,
    useUnitCreation,
} from '../../../../../../graphql/mutations/unit/useUnitCreation';
import {
    TinyUnits,
    useTinyUnits,
} from '../../../../../../graphql/queries/units/useTinyUnits';
import { UnitFilter } from '../../../../../../graphql/schema/Unit/UnitFilter';
import { Unit, UnitClass } from '../../../../../../graphql/schema/Unit/Unit';
import { OperationResult } from '../../../../../../graphql/types';
import NumberField from '../../../../../../components/Forms/components/NumberField';
import { BaseUnits } from '../UnitView/components/UnitDetails';

const UnitsView = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<UnitFilter>({
        skip: 0,
        take: 20,
    });

    const { data, error, loading } = useTinyUnits({ variables: { filter } });

    const count = data ? data.units.count : 0;
    const units = data ? data.units.items : [];

    const [result, setResult] =
        React.useState<OperationResult<CreateUnitRes> | null>(null);

    const [edits, setEdits] = React.useState<CreateUnitArgs['data'] | null>(
        null
    );

    const [create, { loading: createLoading }] = useUnitCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [TinyUnits],
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
                                <PageTitle>Units</PageTitle>
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
                                <Button
                                    onClick={() =>
                                        setEdits({
                                            english: '',
                                            spanish: '',
                                            class: UnitClass.Weight,
                                            base_per_unit: 0,
                                        })
                                    }
                                    startIcon={<MdAdd />}
                                >
                                    Unit
                                </Button>
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
                            rows={units.map((c) => ({ ...c, id: c._id }))}
                            columns={[
                                {
                                    field: 'english',
                                    flex: 1,
                                    headerName: 'English name',
                                },
                                {
                                    field: 'spanish',
                                    flex: 1,
                                    headerName: 'Spanish name',
                                },
                                {
                                    field: 'class',
                                    flex: 1,
                                    headerName: 'Measured in',
                                    valueGetter: (data) =>
                                        (data.row as Unit).class ==
                                        UnitClass.Count
                                            ? 'Eaches'
                                            : (data.row as Unit).class ==
                                              UnitClass.Time
                                            ? 'Minutes'
                                            : (data.row as Unit).class ==
                                              UnitClass.Volume
                                            ? 'Gallons'
                                            : (data.row as Unit).class ==
                                              UnitClass.Weight
                                            ? 'Pounds'
                                            : '',
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
                        ? 'Unit created!'
                        : undefined
                }
                onSuccess={() => {
                    if (result && result.success == true) {
                        setEdits(null);
                        setResult(null);
                        nav(result.data.createUnit._id);
                    }
                }}
            >
                <PanelHeader onClose={onClose}>Create unit</PanelHeader>
                <FormRow>
                    <UnitClassField
                        label="Unit type"
                        value={edits ? edits.class : UnitClass.Weight}
                        onChange={(unit_class) => {
                            if (edits) {
                                setEdits({ ...edits, class: unit_class });
                            }
                        }}
                    />
                </FormRow>
                <FormRow>
                    <TextFormField
                        disabled={loading}
                        label="English"
                        value={edits ? edits.english || '' : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    english: val || '',
                                });
                        }}
                    />
                    <TextFormField
                        disabled={loading}
                        label="English plural"
                        value={edits ? edits.english_plural || '' : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    english_plural: val || '',
                                });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <TextFormField
                        disabled={loading}
                        label="Spanish"
                        value={edits ? edits.spanish || '' : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    spanish: val || '',
                                });
                        }}
                    />
                    <TextFormField
                        disabled={loading}
                        label="Spanish plural"
                        value={edits ? edits.spanish_plural || '' : ''}
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    spanish_plural: val || '',
                                });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <NumberField
                        label={
                            edits
                                ? `${BaseUnits[edits.class][1]} per ${
                                      edits.english
                                  }`
                                : ''
                        }
                        value={
                            edits && edits.base_per_unit !== undefined
                                ? edits.base_per_unit
                                : null
                        }
                        onChange={(val) => {
                            if (edits)
                                setEdits({
                                    ...edits,
                                    base_per_unit: val || 0,
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

export default UnitsView;
