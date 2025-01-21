"use client";

import { Box, FormHelperText, Grid, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { ImageSelectPlaceholder } from './components/placeholder';
import { ImageSelectModal } from './image-select-modal';

// ----------------------------------------------------------------------

type Props = {
    values: string[];
    onSelectValues: (paths: string[]) => void;
    errorMessage?: string;
    modalTitle?: string;
    multiple?: boolean;
    placeholderHeading?: string;
    placeholderSubHeading?: string;
    multipleImageHeader?: string;
    imageReset?: () => void;
};

export function UploadByModalTwo({
    values,
    onSelectValues,
    errorMessage,
    modalTitle = 'Select image',
    multiple = false,
    placeholderHeading,
    placeholderSubHeading,
    multipleImageHeader = 'Selected images',
}: Props) {

    const openImageModal = useBoolean();

    return (
        <>
            {values[0]?.length && multiple ? (
                <>
                    <Typography>{multipleImageHeader}:</Typography>
                    <Box
                        onClick={openImageModal.onTrue}
                        sx={{
                            bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                            border: (theme) =>
                                `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                            transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                            borderRadius: 1,
                            ...(!!errorMessage &&
                                !values[0]?.length && {
                                color: 'error.main',
                                borderColor: 'error.main',
                                bgcolor: (theme) => varAlpha(theme.vars.palette.error.mainChannel, 0.08),
                            }),
                        }}
                    >
                        <ImageSelectPlaceholder
                            heading={placeholderHeading}
                            subHeading={placeholderSubHeading}
                        />
                    </Box>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {values.map((path: string) => (
                            <Grid item xs={12} sm={6} md={4} key={path}>
                                <Box sx={{ position: 'relative' }}>
                                    <Box
                                        component="img"
                                        src={`${CONFIG.bucketUrl}/${path}`}
                                        sx={{
                                            width: '500px',
                                            height: '320px',
                                            borderRadius: 1,
                                            objectFit: 'cover',
                                            border: `2px dashed ${grey[400]}`,
                                            bgcolor: (theme) =>
                                                varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            bgcolor: (theme) =>
                                                varAlpha(theme.vars.palette.grey['900Channel'], 0.4),
                                            transform: 'translate(36%, -36%)',
                                            '&:hover': {
                                                bgcolor: (theme) =>
                                                    varAlpha(theme.vars.palette.grey['900Channel'], 0.6),
                                            },
                                        }}
                                        onClick={() =>
                                            onSelectValues(
                                                values.filter((item: string) => item !== path)
                                            )
                                        }
                                    >
                                        <Iconify icon="eva:close-fill" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <Box
                    onClick={openImageModal.onTrue}
                    sx={{
                        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                        border: (theme) =>
                            `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                        transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                        borderRadius: 1,
                        ...(!!errorMessage &&
                            !values[0]?.length && {
                            color: 'error.main',
                            borderColor: 'error.main',
                            bgcolor: (theme) => varAlpha(theme.vars.palette.error.mainChannel, 0.08),
                        }),
                    }}
                >
                    {values[0]?.length > 0 && !multiple ? (
                        <Box
                            component="img"
                            src={`${CONFIG.bucketUrl}/${values[0]}`}
                            sx={{ width: 1, height: '500px', borderRadius: 1, objectFit: 'cover' }}
                        />

                    ) : (
                        <ImageSelectPlaceholder
                            heading={placeholderHeading}
                            subHeading={placeholderSubHeading}
                        />
                    )}
                </Box>
            )}
            {errorMessage && !values[0]?.length && (
                <FormHelperText error={!!errorMessage} sx={{ px: 2 }}>
                    {errorMessage}
                </FormHelperText>
            )}
            <ImageSelectModal
                open={openImageModal.value}
                onClose={openImageModal.onFalse}
                onSelectValues={onSelectValues}
                selectedFiles={values}
                title={modalTitle}
                multiple={multiple}
            />
        </>
    );
}
