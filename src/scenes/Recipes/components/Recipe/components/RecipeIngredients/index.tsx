import { Box, Dialog, Fab, Typography, useTheme } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import React, { ReactElement } from 'react';
import { MdEdit, MdPrint } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../components/AppFab';
import RecipeDocumentRender from '../../../../../../components/Document/components/RecipeDocument';
import RecipeVersionPreview from '../../../../../../components/RecipeVersionPreview';
import { Recipe } from '../../../../../../graphql/schema/Recipe/Recipe';
import NoVersion from '../NoVersion';

export interface RecipeIngredientsProps {
    recipe: Recipe;
}

const RecipeIngredients = (props: RecipeIngredientsProps): ReactElement => {
    const { recipe } = props;
    const nav = useNavigate();

    const { spacing } = useTheme();

    const [print, setPrint] = React.useState(false);

    return (
        <Box sx={{ height: '100%' }}>
            {!recipe.active ? (
                <NoVersion recipe={recipe} />
            ) : (
                <Box sx={{ paddingTop: 3, maxWidth: 500 }}>
                    <RecipeVersionPreview version={recipe.active} />
                </Box>
            )}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: spacing(8),
                    right: spacing(8),
                    display: 'flex',
                    gap: 2,
                }}
            >
                <Fab variant="extended" onClick={() => setPrint(true)}>
                    <Box
                        sx={{
                            fontSize: '1.25rem',
                            display: 'flex',
                            paddingRight: 1,
                        }}
                    >
                        <MdPrint />
                    </Box>
                    Print
                </Fab>
                <Fab
                    color="primary"
                    variant="extended"
                    onClick={() =>
                        nav(recipe.active ? `${recipe.active._id}/new` : 'new')
                    }
                >
                    <Box
                        sx={{
                            fontSize: '1.25rem',
                            display: 'flex',
                            paddingRight: 1,
                        }}
                    >
                        <MdEdit />
                    </Box>
                    Edit Recipe
                </Fab>
            </Box>

            {recipe.active && (
                <Dialog
                    onClose={() => setPrint(false)}
                    open={print}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{ sx: { height: '90vh' } }}
                >
                    <PDFViewer
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                    >
                        <RecipeDocumentRender>
                            {{
                                _type: 'recipe',
                                version: { ...recipe.active, recipe },
                            }}
                        </RecipeDocumentRender>
                    </PDFViewer>
                </Dialog>
            )}
        </Box>
    );
};

export default RecipeIngredients;
