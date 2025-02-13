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
import { addTagAsync, deleteTagAsync, updateTagAsync } from '../_lib/feature-and-tag-actions';
import { TDialogMode, TTag } from '../_lib/feature-and-tag-types';

interface IUserModalProps {
    open: boolean;
    onClose: () => void;
    mode: TDialogMode;
    fetchData: () => void;
    data?: TTag[];
}

export const TagDialog = (props: IUserModalProps) => {
    const { open, onClose, mode, fetchData, data } = props;

    const [loading, setLoading] = React.useState(false);

    const tagOptions = data?.map((option) => ({ label: option.name, value: option.id })) || [];

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
            if (mode === 'EDIT' && !values.id.length) {
                errors.id = formConstants.required;
            }
            if (mode === 'DELETE' && !values.id.length) {
                errors.id = formConstants.required;
            }
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            let res: any;
            if (mode === 'ADD') {
                res = await addTagAsync({ name: values.name });
            }
            if (mode === 'EDIT') {
                res = await updateTagAsync(values.id, { name: values.name });
            }
            if (mode === 'DELETE') {
                res = await deleteTagAsync([values.id]);
            }
            if (res?.success) {
                fetchData();
                onClose();
            }
            setLoading(false);
        },
    });


    console.log(values, "values....")
    console.log(errors, "errors....")

    const handleTitle = (mode: TDialogMode) => {
        switch (mode) {
            case 'ADD':
                return 'Add Tag';
            case 'EDIT':
                return 'Edit Tag';
            case 'DELETE':
                return 'Delete Tag';
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
                    mode === 'ADD' && data && (
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
                    mode === 'EDIT' && tagOptions?.length && (
                        <>
                            <Grid item xs={12} md={6}>
                                <Autocomplete
                                    fullWidth
                                    value={tagOptions.find((option) => option.value === values.id) || null}
                                    options={tagOptions}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id', newValue?.value || '');
                                        setFieldValue('name', newValue?.label || '');
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Select Tag" />}
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
                                        label="Change Tag"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                        </>
                    )
                }

                {
                    mode === 'DELETE' && tagOptions?.length && (
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                value={tagOptions.find((option) => option.value === values.id) || null}
                                options={tagOptions}
                                onChange={(event, newValue) => {
                                    setFieldValue('id', newValue?.value || '');
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Tag" />}
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
