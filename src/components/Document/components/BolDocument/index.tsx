import React, { ReactElement } from 'react';
import { BolDocument } from '../../types';

export interface BolDocumentProps {
    children: BolDocument;
}

const BolDocumentRender = (props: BolDocumentProps): ReactElement => {
    const {} = props;

    return <React.Fragment></React.Fragment>;
};

export default BolDocumentRender;
