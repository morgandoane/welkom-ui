import { Box, Pagination, useTheme } from '@mui/material';
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
            }}
        >
            <Pagination
                count={pageCount}
                color="primary"
                onChange={(event, page) => changePage(page)}
                page={currentPage}
            />
        </Box>
    );
};

export default TablePagination;
