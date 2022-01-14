import { Box, ButtonBase, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { VerificationIcon } from '../../../../../../../../../../components/Forms/VerificationForm';
import { Bol } from '../../../../../../../../../../graphql/schema/Bol/Bol';
import { Fulfillment } from '../../../../../../../../../../graphql/schema/Fulfillment/Fulfillment';

export interface FulfillmentTagProps {
    bol: Bol;
    fulfillment: Fulfillment;
}

const FulfillmentTag = (props: FulfillmentTagProps): ReactElement => {
    const {
        fulfillment: { _id, lots, created_by, verification },
        bol,
    } = props;

    const nav = useNavigate();

    const { palette, shape } = useTheme();

    const name =
        created_by.given_name && created_by.family_name
            ? `${created_by.given_name} ${created_by.family_name}`
            : created_by.name;

    return (
        <ButtonBase
            onClick={() => nav(bol._id + '/' + _id)}
            sx={{
                width: '100%',
                ...shape,
                p: 1,
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: palette.primary.main,
                gap: 1,
                textAlign: 'left',
            }}
        >
            <Box
                sx={{
                    color: palette.success.main,
                    fontSize: '1.5rem',
                    paddingRight: 0.5,
                }}
            >
                <VerificationIcon
                    status={verification ? verification.status : null}
                />
            </Box>
            <Box>
                <Typography>
                    {lots.map((lot) => `${lot.item.english}`)}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {name}
                </Typography>
            </Box>
        </ButtonBase>
    );
};

export default FulfillmentTag;
