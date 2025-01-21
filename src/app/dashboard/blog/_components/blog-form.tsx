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
import ListItemField from 'src/components/form-fields/list-item-field';
import { UploadByModal } from 'src/components/modal/image-select-modal/upload-by-modal';
import { paths } from 'src/routes/paths';
import { createBlogAsync } from '../_lib/blog.actions';
import { blogValidationSchema } from '../_lib/blog.schema';
import { defaultBlog, IBlog } from '../_lib/blog.types';

export default function BlogForm({ value }: { value?: IBlog }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
    const router = useRouter();

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
                const res = await createBlogAsync(values);
                if (res?.success) {
                    router.push(paths.dashboard.property);
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
                tags: value.tags.split(','),
                thumbnail: value.thumbnail || '',
                images: value.images
            };
            setValues(previousValues);
        }
    }, [value]);

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
                            <ListItemField
                                name="tags"
                                label="Tags"
                                setFieldValue={setFieldValue}
                                values={values.tags}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <Editor
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
