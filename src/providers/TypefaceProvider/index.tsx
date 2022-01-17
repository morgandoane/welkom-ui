import React, { ReactElement } from 'react';
import { Font } from '@react-pdf/renderer';
import RubikBold from './typography/Rubik/Rubik-Bold.ttf';
import RubikMedium from './typography/Rubik/Rubik-Medium.ttf';

export interface TypefaceProviderProps {
    children: ReactElement;
}

const TypefaceProvider = (props: TypefaceProviderProps): ReactElement => {
    const { children } = props;

    Font.register({
        family: 'Rubik',
        fonts: [{ src: RubikBold }, { src: RubikMedium }],
    });

    return <React.Fragment>{children}</React.Fragment>;
};

export default TypefaceProvider;
