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
import { addFeatureAsync, deleteFeatureAsync, getFeatures, updateFeatureAsync } from '../_lib/feature-and-tag-actions';
import { TDialogMode, TFeature, TFeatureGroup } from '../_lib/feature-and-tag-types';

interface IUserModalProps {
    open: boolean;
    onClose: () => void;
    mode: TDialogMode;
    fetchData: () => void;
    data?: TFeatureGroup[];
}

export const FeatureDialog = (props: IUserModalProps) => {
    const { open, onClose, mode, fetchData, data } = props;

    const [loading, setLoading] = React.useState(false);
    const [featureList, setFeatureList] = React.useState<TFeature[]>([]);

    const groupOptions = data?.map((option) => ({ label: option.name, value: option.id })) || [];
    const featureOptions = featureList?.map((option) => ({ label: option.name, value: option.id, group: option.feature_group_id })) || [];

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: { name: '', feature_group_id: '', id: '' },
        validate: (values) => {
            const errors: any = {};
            if (mode === 'ADD' && !values.name.length) {
                errors.name = formConstants.required;
            }
            if (mode === 'ADD' && !values.feature_group_id.length) {
                errors.feature_group_id = formConstants.required;
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
                res = await addFeatureAsync({ name: values.name, feature_group_id: values.feature_group_id });
            }
            if (mode === 'EDIT') {
                res = await updateFeatureAsync(values.id, { name: values.name, feature_group_id: values.feature_group_id });
            }
            if (mode === 'DELETE') {
                res = await deleteFeatureAsync([values.id]);
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
                return 'Add Feature';
            case 'EDIT':
                return 'Edit Feature';
            case 'DELETE':
                return 'Delete Feature';
            default:
                return;
        }
    }

    async function fetchFeatureList() {
        try {
            setLoading(true);
            const response = await getFeatures([{ name: 'limit', value: 1000 }]);
            if (response.success) {
                setFeatureList(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchFeatureList();
    }, []);

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
                        <>
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
                                <Autocomplete
                                    fullWidth
                                    value={groupOptions.find((option) => option.value === values.feature_group_id) || null}
                                    options={groupOptions}
                                    onChange={(event, newValue) => {
                                        setFieldValue('feature_group_id', newValue?.value || '');
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Group" />}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.value}>
                                            {option.label}
                                        </li>
                                    )}
                                />
                                {errors.feature_group_id && <ErrorText error={errors.feature_group_id} />}
                            </Grid>
                        </>
                    )
                }

                {
                    mode === 'EDIT' && featureList?.length && (
                        <>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    value={featureOptions.find((option) => option.value === values.id) || null}
                                    options={featureOptions}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id', newValue?.value || '');
                                        setFieldValue('name', newValue?.label || '');
                                        setFieldValue('feature_group_id', newValue?.group || '');
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Select Feature" />}
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
                                        label="Change Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <ErrorText error={errors.name} />}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Autocomplete
                                    fullWidth
                                    value={groupOptions.find((option) => option.value === values.feature_group_id) || null}
                                    options={groupOptions}
                                    onChange={(event, newValue) => {
                                        setFieldValue('feature_group_id', newValue?.value || '');
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Change Group" />}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.value}>
                                            {option.label}
                                        </li>
                                    )}
                                />
                            </Grid>
                        </>
                    )
                }

                {
                    mode === 'DELETE' && featureList?.length && (
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                value={featureOptions.find((option) => option.value === values.id) || null}
                                options={featureOptions}
                                onChange={(event, newValue) => {
                                    setFieldValue('id', newValue?.value || '');
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Feature" />}
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
