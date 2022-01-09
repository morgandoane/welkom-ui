import { Box, Fade } from '@mui/material';
import React, { ReactElement } from 'react';

interface ViewFadeProps {
    index: number;
    children: ReactElement[];
}

const timing = 250;

const ViewFade = (props: ViewFadeProps): ReactElement => {
    const { index, children: views } = props;

    const [position, setPosition] = React.useState(index);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setPosition(index);
        }, timing);

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <Fade timeout={timing} in={position === index}>
            <Box sx={{ height: '100%' }}>{views[position]}</Box>
        </Fade>
    );
};

export default ViewFade;
