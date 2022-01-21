import React, { ReactElement } from 'react';
import { RecipeDocument } from '../../types';
import ReactPDF, {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from '@react-pdf/renderer';
import { useTheme } from '@mui/material';
import { useBarcode } from '@createnextapp/react-barcode';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { spacing } from '@mui/system';
import { fraction } from '../../../../utils/fraction';
import { format } from 'date-fns';
import { dateFormats } from '../../../../utils/dateFormats';

export interface RecipeDocumentProps {
    children: RecipeDocument;
}

const RecipeDocumentRender = (props: RecipeDocumentProps): any => {
    const { children: data } = props;
    const { palette, typography, shape, spacing } = useTheme();
    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: '.375in',
        },
    });

    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, data.version._id, { displayValue: false });
    const barcode = barcodeCanvas.toDataURL();

    const qrCanvas = document.createElement('canvas');
    QRCode.toCanvas(
        qrCanvas,
        `www.ldbbakery.com/recipes/${data.version.recipe._id}`
    );
    const qr = qrCanvas.toDataURL();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ flexGrow: 1 }}>
                    <View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={{ height: 80, width: 80 }}
                                src={
                                    window.location.origin + '/images/logo.png'
                                }
                            />
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                    paddingLeft: 16,
                                }}
                            >
                                <Text style={{ fontSize: 32, fontWeight: 900 }}>
                                    Recipe
                                </Text>
                                <Text style={{ fontSize: 18, marginTop: 4 }}>
                                    {data.version.recipe.name}
                                </Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <Image
                                    style={{
                                        width: '65px',
                                        height: '65px',
                                    }}
                                    source={qr}
                                />
                                <Image
                                    style={{
                                        width: '160px',
                                        height: '65px',
                                    }}
                                    source={barcode}
                                />
                            </View>
                        </View>

                        <Text style={{ fontSize: '12px' }}></Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 16,
                            border: `0.5px solid ${palette.divider}`,
                            borderRadius: 4,
                        }}
                    >
                        {data.version.sections.map((section, index) => (
                            <View key={'s_' + index} style={{}}>
                                {/* Section header */}
                                <View
                                    style={{
                                        backgroundColor: '#D4D4D4',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        ...(index == 0
                                            ? {
                                                  borderTopLeftRadius: 4,
                                                  borderTopRightRadius: 4,
                                              }
                                            : {}),
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 120,
                                            borderRight: `0.5px solid ${palette.divider}`,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            flex: 1,
                                            padding: 4,
                                        }}
                                    >
                                        {section.label ||
                                            `Section ${index + 1}`}
                                    </Text>
                                    <View
                                        style={{
                                            width: 120,
                                            borderLeft: `0.5px solid ${palette.divider}`,
                                        }}
                                    />
                                </View>
                                {/* Section body */}
                                <View>
                                    {section.steps.map((step, stepIndex) => (
                                        <View
                                            key={step._id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                borderBottom:
                                                    stepIndex !==
                                                    section.steps.length - 1
                                                        ? `0.5px solid ${palette.divider}`
                                                        : undefined,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderRight: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderRight: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderRight: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderRight: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderRight: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    padding: 4,
                                                    flexGrow: 1,
                                                }}
                                            >
                                                {step.content
                                                    ? `${fraction(
                                                          step.content.quantity
                                                      )} ${
                                                          step.content.unit[
                                                              step.content
                                                                  .quantity == 1
                                                                  ? 'spanish'
                                                                  : 'spanish_plural'
                                                          ]
                                                      } ${step.content.items
                                                          .map((s) => s.spanish)
                                                          .join(', ')}`
                                                    : step.instruction || ''}
                                            </Text>
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderLeft: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderLeft: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderLeft: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderLeft: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    width: 24,
                                                    borderLeft: `0.5px solid ${palette.divider}`,
                                                }}
                                            />
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{ paddingTop: 8 }}>
                        {data.version.parameters.map((param, index) => (
                            <Text
                                style={{ fontSize: 12, paddingBottom: 2 }}
                                key={'paramText_' + index}
                            >
                                {param}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text
                        style={{ fontSize: 10 }}
                    >{`Version created by ${data.version.created_by.name}`}</Text>
                    <Text style={{ fontSize: 10 }}>
                        {format(
                            new Date(data.version.date_created),
                            dateFormats.condensedDate + ' ' + dateFormats.time
                        )}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default RecipeDocumentRender;
