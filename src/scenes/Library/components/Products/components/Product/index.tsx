import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdBusiness } from 'react-icons/md';
import { BiBarcode } from 'react-icons/bi';
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
                                            entity="Product"
                                            data={product}
                                            refetchQueries={[ProductQuery]}
                                            extensions={[
                                                {
                                                    primary:
                                                        product.company.name,
                                                    secondary: 'Company',
                                                    avatar: (
                                                        <MdBusiness
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    primary: product.upc,
                                                    secondary: 'UPC',
                                                    avatar: (
                                                        <BiBarcode
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                            }}
                                                        />
                                                    ),
                                                },
                                            ]}
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