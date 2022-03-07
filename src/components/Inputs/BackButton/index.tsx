import { Button, ButtonProps } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft } from 'react-icons/md';

export type BackButtonProps = ButtonProps;

const BackButton = (props: BackButtonProps): ReactElement => {
    const {
        startIcon = <MdChevronLeft />,
        variant = 'text',
        color = 'inherit',
    } = props;

    return (
        <Button
            {...props}
            startIcon={startIcon}
            variant={variant}
            color={color}
        />
    );
};

export default BackButton;
