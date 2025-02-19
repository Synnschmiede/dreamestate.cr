'use client';

import {
    Autocomplete,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    Stack,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Dialog } from 'src/components/dialog/Dialog';
import { ErrorText } from 'src/components/form-components/error-text';
import { formConstants } from 'src/constants/form-constants';
import { addFeatureGroupAsync, deleteFeatureGroupAsync, updateFeatureGroupAsync } from '../_lib/feature-and-tag-actions';
import { TDialogMode, TFeatureGroup } from '../_lib/feature-and-tag-types';

interface IUserModalProps {
    open: boolean;
    onClose: () => void;
    mode: TDialogMode;
    fetchData: () => void;
    data?: TFeatureGroup[];
}

export const FeatureGroupDialog = (props: IUserModalProps) => {
    const { open, onClose, mode, fetchData, data } = props;

    const [loading, setLoading] = React.useState(false);

    const groupOptions = data?.map((option) => ({ label: option.name, value: option.id })) || [];

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: { name: '', id: '' },
        validate: (values) => {
            const errors: any = {};
            if (mode === 'ADD' && !values.name.length) {
                errors.name = formConstants.required;
            }
            // if (mode === 'EDIT' && !values.id.length) {
            //     errors.id = formConstants.required;
            // }
            if (mode === 'DELETE' && !values.id.length) {
                errors.id = formConstants.required;
            }
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            let res: any;
            if (mode === 'ADD') {
                res = await addFeatureGroupAsync({ name: values.name });
            }
            if (mode === 'EDIT') {
                res = await updateFeatureGroupAsync(values.id, { name: values.name });
            }
            if (mode === 'DELETE') {
                console.log("inside delete: ", values.id);
                res = await deleteFeatureGroupAsync(values.id);
            }
            if (res?.success) {
                fetchData();
                onClose();
            }
            setLoading(false);
        },
    });

    const handleTitle = (mode: TDialogMode) => {
        switch (mode) {
            case 'ADD':
                return 'Add Feature Group';
            case 'EDIT':
                return 'Edit Feature Group';
            case 'DELETE':
                return 'Delete Feature Group';
            default:
                return;
        }
    }


    return (
        <Dialog
            title={handleTitle(mode)}
            onClose={onClose}
            open={open}
            size="md"
            contentWrappedWithForm={{
                onSubmit: handleSubmit,
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    my: 2,
                }}
            >
                {
                    mode === 'ADD' && (
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(errors.name)}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <ErrorText error={errors.name} />}
                            </FormControl>
                        </Grid>
                    )
                }

                {
                    mode === 'EDIT' && data && (
                        <>
                            <Grid item xs={12} md={6}>
                                <Autocomplete
                                    fullWidth
                                    value={groupOptions.find((option) => option.value === values.id) || null}
                                    options={groupOptions}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id', newValue?.value || '');
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Current group name" />}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.value}>
                                            {option.label}
                                        </li>
                                    )}
                                />
                                {errors.id && <ErrorText error={errors.id} />}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={Boolean(errors.name)}>
                                    <TextField
                                        label="New name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <ErrorText error={errors.name} />}
                                </FormControl>
                            </Grid>
                        </>
                    )
                }

                {
                    mode === 'DELETE' && groupOptions?.length && (
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                value={groupOptions.find((option) => option.value === values.id) || null}
                                options={groupOptions}
                                onChange={(event, newValue) => {
                                    setFieldValue('id', newValue?.value || '');
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Group" />}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.value}>
                                        {option.label}
                                    </li>
                                )}
                            />
                            {errors.id && <ErrorText error={errors.id} />}
                        </Grid>
                    )
                }

                <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'} mt={2}>
                    <Button
                        variant="contained"
                        type={loading ? 'button' : 'submit'}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {mode === 'DELETE' ? 'Delete' : 'Save'}
                    </Button>
                </Stack>
            </Grid>
        </Dialog>
    );
};
