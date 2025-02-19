"use client"

import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import { useFormik } from "formik";

export const ContactForm = () => {

    const { handleSubmit, values, handleBlur, handleChange, touched, errors } = useFormik({
        initialValues: {
            name: '',
            email: '',
            apartment: '',
            message: '',
        },
        validate(values) { },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Your Name*"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Your Email*"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        fullWidth
                        error={touched.apartment && Boolean(errors.apartment)}
                    >
                        <InputLabel id="apartment-label">Apartment</InputLabel>
                        <Select
                            labelId="apartment-label"
                            id="apartment"
                            name="apartment"
                            value={values.apartment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <MenuItem value="apt1">Apartment 1</MenuItem>
                            <MenuItem value="apt2">Apartment 2</MenuItem>
                            <MenuItem value="apt3">Apartment 3</MenuItem>
                        </Select>
                        <FormHelperText>
                            {touched.apartment && errors.apartment}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextareaAutosize
                            minRows={4}
                            name="message"
                            placeholder="Type Your Message*"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                width: '100%',
                                padding: '16.5px 14px',
                                borderColor:
                                    touched.message && errors.message
                                        ? 'red'
                                        : 'rgba(0, 0, 0, 0.23)',
                                borderRadius: 4,
                            }}
                        />
                        <FormHelperText sx={{ color: 'red' }}>
                            {touched.message && errors.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                        Submit Message
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}