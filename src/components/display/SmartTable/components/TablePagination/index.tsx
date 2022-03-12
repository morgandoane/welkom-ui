import { Box, Pagination, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { SmartTablePagination } from '../..';

export type TablePaginationProps = SmartTablePagination;

const TablePagination = (props: TablePaginationProps): ReactElement => {
    const { count, filter, setFilter } = props;

    const {
        palette: { divider },
    } = useTheme();

    const pageCount = Math.ceil(count / filter.take);
    const currentPage = (filter.skip + filter.take) / filter.take;

    const changePage = (page: number) => {
        setFilter({ skip: (page - 1) * filter.take, take: filter.take });
    };

    return (
        <Box
            sx={{
                borderTop: `1px solid ${divider}`,
                paddingTop: 2,
                paddingBottom: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Pagination
                count={pageCount}
                color="standard"
                onChange={(event, page) => changePage(page)}
                page={currentPage}
            />
            <Typography>{`Showing ${(currentPage - 1) * filter.take + 1}-${
                filter.take + (currentPage - 1) * filter.take > count
                    ? count
                    : filter.take + (currentPage - 1) * filter.take
            } of ${count}`}</Typography>
        </Box>
    );
};

export default TablePagination;
