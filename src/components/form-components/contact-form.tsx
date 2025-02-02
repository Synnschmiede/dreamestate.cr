'use client';

import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { IUploader } from 'src/app/(public)/properties/_lib/property.interface';
import { TAuthor } from 'src/app/dashboard/blog/_lib/blog.types';
import { Iconify } from 'src/components/iconify';

export const ContactForm = ({ author }: { author: TAuthor | IUploader }) => {
    const initialValue = {
        name: '',
        email: '',
        phone: '',
        message: '',
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues,
        setFieldValue,
        handleBlur,
        touched,
    } = useFormik({
        initialValues: initialValue,
        validateOnBlur: false,
        validateOnChange: false,
        validate: (values) => {
            const errors: any = {};

            return errors;
        },
        onSubmit: async (values) => { },
    });

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                padding: 4,
                borderRadius: 0.5,
                position: 'sticky',
                top: 80,
            }}
        >
            {/* user profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                    src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${author?.profile_pic}`}
                    alt={`${author?.first_name} ${author?.last_name}`}
                    sx={{ width: 58, height: 58 }}
                    variant="rounded"
                />
                <Box>
                    <Typography variant="body1" fontWeight="bold" color="text.secondary">
                        {author?.first_name} {author?.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        {author?.email}
                    </Typography>
                </Box>
            </Box>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Your Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />
                <TextField
                    label="Your Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    label="Your Phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                />
                <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Send Email
                </Button>
            </form>

            {/* Call and WhatsApp Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<Iconify icon="material-symbols:call" />}
                    href={`tel:${author?.contact_number}`}
                >
                    Call
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    fullWidth
                    startIcon={<Iconify icon="mdi:whatsapp" />}
                    href={`https://wa.me/${author?.contact_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WhatsApp
                </Button>
            </Box>
        </Box>
    );
};
