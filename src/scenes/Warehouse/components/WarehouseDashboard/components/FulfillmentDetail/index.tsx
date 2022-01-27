import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getUiPermissions,
    UiPermission,
} from '../../../../../../auth/UiPermission';
import usePermissions from '../../../../../../auth/usePermissions';
import { UserRole } from '../../../../../../auth/UserRole';
import AppNav from '../../../../../../components/AppNav';
import { VerificationIcon } from '../../../../../../components/Forms/VerificationForm';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import TabFade from '../../../../../../components/TabFade';
import { useFulfillment } from '../../../../../../graphql/queries/fulfillment/useFulfillment';
import { FulfillmentType } from '../../../../../../graphql/schema/Fulfillment/Fulfillment';
import FulfillmentAttachments from './components/FulfillmentAttachments';
import FulfillmentContents from './components/FulfillmentContents';
import FulfillmentDetails from './components/FulfillmentDetails';
import FulfillmentDocument from './components/FulfillmentDocument';
import FulfillmentExpenses from './components/FulfillmentExpenses';
import FulfillmentVerification from './components/FulfillmentVerification';

const FulfillmentDetail = (): ReactElement => {
    const nav = useNavigate();
    const { palette } = useTheme();
    const { permissions, roles } = usePermissions();

    const { fulfillment_id } = useParams();

    const { data, error, loading, refetch } = useFulfillment({
        variables: {
            id: fulfillment_id || '',
        },
    });

    const fulfillment = data ? data.fulfillment : null;

    const getAdditionalTabs = (): Record<string, ReactElement> => {
        const uiPermissions = getUiPermissions(permissions);
        if (fulfillment)
            if (
                uiPermissions
                    .map((p) => p.name)
                    .includes(UiPermission.TrackExpenses) ||
                roles.includes(UserRole.Admin) ||
                roles.includes(UserRole.Manager)
            )
                return {
                    Expenses: <FulfillmentExpenses fulfillment={fulfillment} />,
                };
        return {};
    };

    return (
        <AppNav error={error} loading={loading}>
            {fulfillment && (
                <ColumnBox>
                    {{
                        header: (
                            <Box>
                                <Button
                                    variant="text"
                                    color="inherit"
                                    startIcon={<MdChevronLeft />}
                                    onClick={() =>
                                        nav(
                                            !fulfillment
                                                ? ''
                                                : fulfillment.type ==
                                                  FulfillmentType.Receipt
                                                ? '/warehouse/receiving'
                                                : '/warehouse/shipping'
                                        )
                                    }
                                >
                                    {!fulfillment
                                        ? ''
                                        : fulfillment.type ==
                                          FulfillmentType.Receipt
                                        ? 'Receiving'
                                        : 'Shipping'}
                                </Button>
                                <PageTitle
                                    avatar={
                                        fulfillment.verification ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    fontSize: '2.5rem',
                                                }}
                                            >
                                                <VerificationIcon
                                                    status={
                                                        fulfillment.verification
                                                            .status
                                                    }
                                                />
                                            </Box>
                                        ) : undefined
                                    }
                                >
                                    {fulfillment.type}
                                </PageTitle>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingBottom: 0.5,
                                    }}
                                >
                                    <Typography variant="h6">
                                        {fulfillment.bol.from.company.name}
                                    </Typography>
                                    <MdChevronRight
                                        style={{ fontSize: '1.5rem' }}
                                    />
                                    <Typography variant="h6">
                                        {fulfillment.bol.to.company.name}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {fulfillment.bol.code
                                        ? `Against ${
                                              (fulfillment.bol.code || '')
                                                  .toLowerCase()
                                                  .includes('bol')
                                                  ? ''
                                                  : 'BOL '
                                          }
                                    ${fulfillment.bol.code}`
                                        : ''}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >{`On behalf of ${
                                    fulfillment.bol.itinerary.orders.length > 1
                                        ? `POs ${fulfillment.bol.itinerary.orders
                                              .map((o) => o.code)
                                              .join(', ')}`
                                        : `${fulfillment.bol.itinerary.orders[0].code}`
                                }`}</Typography>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Contents: (
                                        <FulfillmentContents
                                            fulfillment={fulfillment}
                                        />
                                    ),
                                    Details: (
                                        <FulfillmentDetails
                                            fulfillment={fulfillment}
                                        />
                                    ),
                                    ['Bol Document']: (
                                        <FulfillmentDocument
                                            fulfillment={fulfillment}
                                            refetch={() => refetch()}
                                        />
                                    ),
                                    ['Other documents']: (
                                        <FulfillmentAttachments
                                            fulfillment={fulfillment}
                                            refetch={() => refetch()}
                                        />
                                    ),
                                    Verification: (
                                        <FulfillmentVerification
                                            fulfillment={fulfillment}
                                        />
                                    ),

                                    ...getAdditionalTabs(),
                                }}
                            </TabFade>
                        ),
                    }}
                </ColumnBox>
            )}
        </AppNav>
    );
};

export default FulfillmentDetail;
