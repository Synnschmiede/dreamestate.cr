"use client"

import { Box, Button, TextField } from "@mui/material"
import { useFormik } from "formik";
import { Iconify } from "src/components/iconify";

export const PropertyDetailsContactForm = () => {

    const initialValue = {
        name: "",
        email: "",
        phone: "",
        message: "",
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues,
        setFieldValue,
        handleBlur,
        touched
    } = useFormik({
        initialValues: initialValue,
        validateOnBlur: false,
        validateOnChange: false,
        validate: (values) => {
            const errors: any = {};

            return errors;
        },
        onSubmit: async (values) => {

        },
    });
    return (
        <Box >

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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Send Email
                </Button>
            </form>

            {/* Call and WhatsApp Buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<Iconify icon="material-symbols:call" />}
                >
                    Call
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    fullWidth
                    startIcon={<Iconify icon="mdi:whatsapp" />}
                >
                    WhatsApp
                </Button>
            </Box>
        </Box>
    )
}