'use client';

import {
    Alert,
    Button,
    Card,
    CardHeader,
    Grid,
    Stack,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Editor } from 'src/components/editor';
import { AutoCompleteWithAdding } from 'src/components/form-fields/auto-complete-with-adding';
import { UploadByModal } from 'src/components/modal/image-select-modal/upload-by-modal';
import { paths } from 'src/routes/paths';
import { getUtilities } from '../../feature-and-tag/_lib/feature-and-tag-actions';
import { IUtilities } from '../../feature-and-tag/_lib/feature-and-tag-types';
import { createBlogAsync, updateBlogAsync } from '../_lib/blog.actions';
import { blogValidationSchema } from '../_lib/blog.schema';
import { defaultBlog, IBlog } from '../_lib/blog.types';

export default function BlogForm({ value }: { value?: IBlog }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
    const [tagAndFeature, setTagAndFeature] = React.useState<IUtilities | null>(null);

    const router = useRouter();

    const tagOptions = tagAndFeature?.tags.map((t) => (
        {
            label: t.name,
            value: t.id
        }
    )) || [];

    const { handleChange, handleSubmit, values, setFieldValue, errors, touched, setValues } =
        useFormik({
            initialValues: defaultBlog,
            validate: (values) => {
                const result = blogValidationSchema.safeParse(values);
                if (result.success) {
                    return {};
                } else {
                    const fieldErrors: any = {};
                    result.error.issues.forEach((issue) => {
                        const path = issue.path.join('.');
                        fieldErrors[path] = issue.message;
                    });
                    return fieldErrors;
                }
            },
            onSubmit: async (values) => {
                setLoading(true);
                let res;
                if (value && value.id) {
                    res = await updateBlogAsync(value.id, values);
                } else {
                    res = await createBlogAsync(values);
                }
                if (res?.success) {
                    router.push(paths.dashboard.blog);
                    return;
                }
                setLoading(false);
                setSubmitSuccessful(true);
            },
        });

    React.useEffect(() => {
        if (value) {
            const previousValues = {
                title: value.title,
                content: value.content,
                tags: value.tags,
                thumbnail: value.thumbnail || '',
                images: value.images
            };
            setValues(previousValues);
        }
    }, [value]);

    React.useEffect(() => {
        const getUtilitiesData = async () => {
            const res = await getUtilities();
            if (res?.data) {
                setTagAndFeature(res.data);
            }
        }
        getUtilitiesData();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                Add new post
            </Alert>
            <Stack direction="column" gap={5}>
                <Card>
                    <CardHeader title="Content" />
                    <Grid container spacing={2} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                value={values.title}
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                tagOptions?.length > 0 && (
                                    <AutoCompleteWithAdding name='tags' label='Select tags' placeholder='tags' options={tagOptions} values={values.tags} setFieldValue={setFieldValue} />
                                )
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <Editor
                                value={values.content}
                                onChange={(value: any) => setFieldValue('content', value)}
                                error={touched.content && Boolean(errors.content)}
                                helperText={touched.content && errors.content}
                                resetValue={isSubmitSuccessful}
                                placeholder="Write something about the property..."
                            />
                        </Grid>
                    </Grid>
                </Card>
                <Card>
                    <CardHeader title="Media Information" />
                    <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                        <UploadByModal
                            values={[values.thumbnail]}
                            onSelectValues={(paths) => setFieldValue("thumbnail", paths[0])}
                            errorMessage={touched.thumbnail && errors.thumbnail ? errors.thumbnail : ''}
                            modalTitle='Select thumbnail'
                            placeholderHeading='Select thumbnail'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ p: 3 }}>
                        <UploadByModal
                            values={values.images}
                            onSelectValues={(paths) => setFieldValue("images", paths)}
                            modalTitle='Select additional images'
                            placeholderHeading='Select additional images'
                            multiple
                        />
                    </Grid>
                </Card>
                <Stack direction="row" justifyContent="flex-end">
                    <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={loading}>
                        Save
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}
