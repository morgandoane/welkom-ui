import React, { ReactElement } from 'react';
import { BolDocument, LotDocument } from './types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useTheme } from '@mui/material';
import BolDocumentRender from './components/BolDocument';
import LotDocumentRender from './components/LotDocument';

export type DocumentClass = BolDocument | LotDocument;

export interface DocumentProps {
    children: DocumentClass;
}

const AppDocument = (props: DocumentProps): ReactElement => {
    const { children: data } = props;

    const { palette, shape, typography } = useTheme();

    switch (data._type) {
        case 'bol': {
            return <BolDocumentRender>{data}</BolDocumentRender>;
        }
        case 'lot': {
            return <LotDocumentRender>{data}</LotDocumentRender>;
        }
    }
};

export default AppDocument;
