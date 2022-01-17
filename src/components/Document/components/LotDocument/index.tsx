import React, { ReactElement } from 'react';
import { LotDocument } from '../../types';
import ReactPDF, {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Svg,
    Image,
} from '@react-pdf/renderer';
import { useTheme } from '@mui/material';
import { useBarcode } from '@createnextapp/react-barcode';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { format } from 'date-fns';
import { dateFormats } from '../../../../utils/dateFormats';

export interface LotDocumentProps {
    children: LotDocument;
}

const LotDocumentRender = (props: LotDocumentProps): any => {
    const { children: data } = props;
    const { palette, typography } = useTheme();
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: 'white',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });

    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, data.code, { displayValue: false });
    const barcode = barcodeCanvas.toDataURL();

    const qrCanvas = document.createElement('canvas');
    QRCode.toCanvas(
        qrCanvas,
        `www.ldbbakery.com/warehouse/receiving/${data.bol_id}/${data.fulfillment_id}`
    );
    const qr = qrCanvas.toDataURL();

    return (
        <Document>
            <Page size={{ width: 288, height: 216 }} style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ fontFamily: 'Rubik' }}>
                        Little Dutch Boy
                    </Text>
                    <Text style={{}}>{data.code}</Text>
                    <Text style={{}}>{data.item.english}</Text>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            width: '65px',
                            height: '65px',
                        }}
                        source={qr}
                    />
                    <Image
                        style={{
                            width: '105%',
                            height: '90px',
                            padding: 0,
                            marginLeft: -8,
                        }}
                        source={barcode}
                    />
                    <Text style={{ fontSize: '12px' }}>
                        {data.created_by.name}
                    </Text>
                    <Text style={{ fontSize: '12px' }}>
                        {format(
                            new Date(data.date_created),
                            dateFormats.condensedDate + ' ' + dateFormats.time
                        )}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default LotDocumentRender;
