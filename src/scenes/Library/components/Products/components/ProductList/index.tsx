import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { ProductFilter } from '../../../../../../graphql/inputsTypes';
import { TinyProduct } from '../../../../../../graphql/schema/Item/extensions/Product/Product';
import { useProducts } from '../../../../../../graphql/schema/Item/extensions/Product/useProducts';

const ProductList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<ProductFilter>({
        skip: 0,
        take: 50,
        name: '',
    });

    const [product, setProduct] = React.useState<TinyProduct[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useProducts({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setProduct(data.products.items);
            setCount(data.products.count);
        },
    });

    return (
        <AppNav error={error} loading={loading}>
            <NavContent>
                {{
                    header: (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                                <Typography variant="crisp">Product</Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Product
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={product}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (product) => nav(product._id),
                            })}
                            pagination={{
                                count,
                                filter,
                                setFilter: (d) =>
                                    setFilter({
                                        ...filter,
                                        ...d,
                                    }),
                            }}
                            controls={{
                                Name: (
                                    <SearchInput
                                        value={filter.name || ''}
                                        onChange={(s) =>
                                            setFilter({ ...filter, name: s })
                                        }
                                    />
                                ),
                            }}
                        >
                            {{
                                Name: (d) => d.names.english,
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default ProductList;
