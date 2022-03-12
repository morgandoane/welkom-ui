import React, { ReactElement } from 'react';

import { ReactComponent as LDBlight } from '../../../media/LDBlight.svg';
import { ReactComponent as LDBdark } from '../../../media/LDBdark.svg';
import { useTheme } from '@mui/material';

const Logo = (props: { height?: number; width?: number }): ReactElement => {
    const { height, width } = props;
    const { palette, transitions } = useTheme();

    if (palette.mode == 'dark')
        return (
            <LDBdark
                style={{
                    height: height,
                    width: width,
                    transition: transitions.create('all', { duration: 300 }),
                }}
            />
        );
    else
        return (
            <LDBlight
                style={{
                    height: height,
                    width: width,
                    transition: transitions.create('all', { duration: 300 }),
                }}
            />
        );
};

export default Logo;
