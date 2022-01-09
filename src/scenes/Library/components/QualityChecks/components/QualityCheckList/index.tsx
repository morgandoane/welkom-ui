import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import {
    QualityCheckFilter,
    useQualityChecks,
} from '../../../../../../graphql/queries/qualityCheck/useQualityChecks';

const QualityCheckList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<QualityCheckFilter>({
        skip: 0,
        take: 25,
        deleted: false,
    });

    const { data, error, loading } = useQualityChecks({
        variables: { filter },
        fetchPolicy: 'network-only',
    });

    const count = data ? data.qualityChecks.count : 0;
    const checks = data ? data.qualityChecks.items : [];

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box
                            sx={{
                                paddingBottom: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <PageTitle>Quality Checks</PageTitle>
                            <Box>
                                <Button
                                    onClick={() => nav('new')}
                                    endIcon={<MdAdd />}
                                >
                                    New quality check
                                </Button>
                            </Box>
                        </Box>
                    ),
                    content: (
                        <DataGrid
                            pagination
                            paginationMode="server"
                            onPageChange={(page) => {
                                setFilter({ ...filter, skip: 25 * page });
                            }}
                            rowsPerPageOptions={[25]}
                            rowCount={count}
                            error={error}
                            loading={loading}
                            rows={checks.map((o) => ({ ...o, id: o._id }))}
                            onRowClick={(params) => nav(params.row._id)}
                            columns={[
                                {
                                    field: 'prompt',
                                    headerName: 'Prompt',
                                    width: 220,
                                    valueGetter: (data) =>
                                        data.row.prompt.phrase,
                                },
                                {
                                    field: 'item',
                                    headerName: 'Item',
                                    width: 220,
                                    valueGetter: (data) =>
                                        data.row.item.english,
                                },
                            ]}
                        />
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default QualityCheckList;
