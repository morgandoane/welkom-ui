import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttachmentsTab from '../../../../../../components/display/DataTabs/AttachmentsTab';
import DetailsTab from '../../../../../../components/display/DataTabs/DetailsTab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import {
    ProductQuery,
    useProduct,
} from '../../../../../../graphql/schema/Item/extensions/Product/useProduct';

const Product = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useProduct({
        variables: { id: id || '' },
    });

    const product = data ? data.product : null;

    return (
        <AppNav error={error} loading={loading}>
            {product && (
                <NavContent>
                    {{
                        header: (
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Box>
                                        <BackButton
                                            onClick={() =>
                                                nav('/library/products')
                                            }
                                        >
                                            Product
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {product.names.english}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Item"
                                            data={product}
                                            refetchQueries={[ProductQuery]}
                                        />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={product}
                                            refetchQueries={[ProductQuery]}
                                        />
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default Product;
