import { useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import DesktopAppNav from './DesktopAppNav';
import MobileAppNav from './MobileAppNav';

export interface AppNavProps {
    loading?: boolean;
    error?: Error;
    children?: ReactElement | ReactNode | ReactNode[] | ReactElement[];
}

const AppNav = (props: AppNavProps): ReactElement => {
    const { breakpoints } = useTheme();
    const small = useMediaQuery(breakpoints.down('sm'));
    if (small) return <MobileAppNav {...props} />;
    else return <DesktopAppNav {...props} />;
};

export default AppNav;
