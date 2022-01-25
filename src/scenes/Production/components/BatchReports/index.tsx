import { Box } from '@mui/material';
import { differenceInMinutes, format } from 'date-fns';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import SmartTable from '../../../../components/SmartTable';
import { useBatches } from '../../../../graphql/queries/batch/useBatches';
import { BatchFilter } from '../../../../graphql/schema/Batch/BatchFilter';
import { dateFormats } from '../../../../utils/dateFormats';

const BatchReports = (): ReactElement => {
    const nav = useNavigate();
    const [filter, setFilter] = React.useState<BatchFilter>({
        skip: 0,
        take: 25,
    });

    const { data, error, loading } = useBatches({
        variables: { filter },
    });

    const batches = data ? data.batches.items : [];
    const count = data ? data.batches.count : 0;

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <PageTitle>Batch Reports</PageTitle>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={batches}
                            getProps={(batch) => ({
                                id: batch._id,
                                onClick: (data) => nav(data._id),
                            })}
                            pagination={{
                                count,
                                skip: filter.skip,
                                take: filter.take,
                                setPage: (p) => {
                                    setFilter({
                                        ...filter,
                                        skip:
                                            p == 1 ? 0 : (p - 1) * filter.take,
                                    });
                                },
                            }}
                        >
                            {{
                                Location: (batch) =>
                                    (batch.location
                                        ? batch.location.label ||
                                          batch.location.address?.city ||
                                          'Unknown location'
                                        : '') +
                                    ' ' +
                                    (batch.production_line
                                        ? `(${batch.production_line?.name})`
                                        : ''),
                                Item: (batch) => batch.lot.item.english,
                                Date: (batch) =>
                                    format(
                                        new Date(batch.date_created),
                                        dateFormats.condensedDate +
                                            ' ' +
                                            dateFormats.time
                                    ),
                                Mixer: (batch) => batch.created_by.name,
                                Duration: (batch) =>
                                    batch.date_completed
                                        ? `${differenceInMinutes(
                                              new Date(batch.date_completed),
                                              new Date(batch.date_created)
                                          )} minute${
                                              differenceInMinutes(
                                                  new Date(
                                                      batch.date_completed
                                                  ),
                                                  new Date(batch.date_created)
                                              ) == 1
                                                  ? ''
                                                  : 's'
                                          }`
                                        : 'Not complete',
                            }}
                        </SmartTable>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default BatchReports;
