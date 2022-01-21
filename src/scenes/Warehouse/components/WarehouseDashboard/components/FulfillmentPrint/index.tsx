import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import { useFulfillment } from '../../../../../../graphql/queries/fulfillment/useFulfillment';
import { FulfillmentType } from '../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { PDFViewer } from '@react-pdf/renderer';
import LotDocument from '../../../../../../components/Document/components/LotDocument';
import LotDocumentRender from '../../../../../../components/Document/components/LotDocument';

const FulfillmentPrint = (): ReactElement => {
    const { fulfillment_id } = useParams();
    const nav = useNavigate();
    const { spacing } = useTheme();

    const { data, error, loading } = useFulfillment({
        variables: {
            id: fulfillment_id || '',
        },
        skip: !fulfillment_id,
    });

    const fulfillment = data ? data.fulfillment : null;

    return (
        <AppNav discrete={false} loading={loading} error={error}>
            {fulfillment && (
                <ColumnBox>
                    {{
                        header: (
                            <Box>
                                <PageTitle>{`${fulfillment.type} labels`}</PageTitle>
                            </Box>
                        ),
                        content: (
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexFlow: 'column',
                                }}
                            >
                                <PDFViewer
                                    style={{
                                        width: '100%',
                                        flex: 1,
                                        border: 'none',
                                        paddingBottom: spacing(4),
                                    }}
                                >
                                    {
                                        fulfillment.lots.map((lot) => (
                                            <LotDocumentRender
                                                key={'lotDoc_' + lot._id}
                                            >
                                                {{
                                                    _type: 'lot',
                                                    ...lot,
                                                    fulfillment_id:
                                                        fulfillment._id,
                                                    bol_id: fulfillment.bol._id,
                                                }}
                                            </LotDocumentRender>
                                        )) as any
                                    }
                                </PDFViewer>
                            </Box>
                        ),
                        footer: (
                            <Box>
                                <Button
                                    onClick={() =>
                                        nav(
                                            fulfillment.type ===
                                                FulfillmentType.Receipt
                                                ? '/warehouse/receiving/'
                                                : '/warehouse/shipping'
                                        )
                                    }
                                    startIcon={<MdChevronLeft />}
                                    size="large"
                                >
                                    Done
                                </Button>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
        </AppNav>
    );
};

export default FulfillmentPrint;
