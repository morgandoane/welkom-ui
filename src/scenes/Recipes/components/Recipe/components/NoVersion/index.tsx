import { Box, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../components/Message';
import { Recipe } from '../../../../../../graphql/schema/Recipe/Recipe';

export interface NoVersionProps {
    recipe: Recipe;
}

const NoVersion = (props: NoVersionProps): ReactElement => {
    const { recipe } = props;
    const nav = useNavigate();

    return (
        <Box sx={{ height: '80%' }}>
            <Message
                type="Info"
                message="This recipe is brand new."
                action={
                    <Box sx={{ p: 1 }}>
                        <Button
                            size="large"
                            onClick={() => nav(`/recipes/${recipe._id}/new`)}
                        >
                            Get started
                        </Button>
                    </Box>
                }
            />
        </Box>
    );
};

export default NoVersion;
