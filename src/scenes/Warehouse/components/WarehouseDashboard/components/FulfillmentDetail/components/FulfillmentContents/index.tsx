import { Box, Button, Collapse, Dialog, useTheme } from '@mui/material';
import { id } from 'date-fns/locale';
import React, { ReactElement } from 'react';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../../../components/AppFab';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import FulfillmentLine from './components/FulfillmentLine';
import { PDFViewer } from '@react-pdf/renderer';
import LotDocumentRender from '../../../../../../../../components/Document/components/LotDocument';

export interface FulfillmentContentsProps {
    fulfillment: Fulfillment;
}

const FulfillmentContents = (props: FulfillmentContentsProps): ReactElement => {
    const { fulfillment } = props;

    const nav = useNavigate();

    const { palette } = useTheme();

    const [focusedLot, setFocusedLot] = React.useState<
        null | Fulfillment['lots'][number]
    >(null);

    return (
        <Box
            sx={{
                paddingTop: 3,
                display: 'flex',
                flexFlow: 'column',
                gap: 2,
                alignItems: 'flex-start',
            }}
        >
            {fulfillment.bol.contents.map((c, i) => (
                <FulfillmentLine
                    key={'fLine_' + i}
                    content={c}
                    fulfillment={fulfillment}
                    onPrint={(lot) => {
                        setFocusedLot(lot);
                    }}
                />
            ))}
            <AppFab
                icon={<MdEdit />}
                onClick={() => nav('edit')}
            >{`Edit ${fulfillment.type}`}</AppFab>
            <Dialog
                onClose={() => setFocusedLot(null)}
                open={Boolean(focusedLot)}
                maxWidth="lg"
                fullWidth
                PaperProps={{ sx: { height: '90vh' } }}
            >
                <PDFViewer
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                >
                    {
                        (focusedLot ? [focusedLot] : []).map((lot) => (
                            <LotDocumentRender key={'lotDoc_' + lot._id}>
                                {{
                                    _type: 'lot',
                                    ...lot,
                                    fulfillment_id: fulfillment._id,
                                    bol_id: fulfillment.bol._id,
                                    fulfillment_type: fulfillment.type,
                                }}
                            </LotDocumentRender>
                        )) as any
                    }
                </PDFViewer>
            </Dialog>
        </Box>
    );
};

export default FulfillmentContents;
