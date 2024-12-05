"use client";

import { useFormik } from "formik";

import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";

export const ScheduleVisit = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            apartment: "",
            message: "",
        },
        validate(values) {

        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Box sx={{ display: "grid", minHeight: "100vh", gridTemplateColumns: { lg: "1fr 1fr", xs: "1fr" } }}>
            {/* Form Section */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
                <Card sx={{ maxWidth: 500, width: "100%", pt: 4 }}>
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        Schedule a Visit
                    </Typography>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Your Name*"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Your Email*"
                                        name="email"
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={formik.touched.apartment && Boolean(formik.errors.apartment)}>
                                        <InputLabel id="apartment-label">Apartment</InputLabel>
                                        <Select
                                            labelId="apartment-label"
                                            id="apartment"
                                            name="apartment"
                                            value={formik.values.apartment}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <MenuItem value="apt1">Apartment 1</MenuItem>
                                            <MenuItem value="apt2">Apartment 2</MenuItem>
                                            <MenuItem value="apt3">Apartment 3</MenuItem>
                                        </Select>
                                        <FormHelperText>{formik.touched.apartment && formik.errors.apartment}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextareaAutosize
                                            minRows={4}
                                            name="message"
                                            placeholder="Type Your Message*"
                                            value={formik.values.message}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{
                                                width: "100%",
                                                padding: "16.5px 14px",
                                                borderColor: formik.touched.message && formik.errors.message ? "red" : "rgba(0, 0, 0, 0.23)",
                                                borderRadius: 4,
                                            }}
                                        />
                                        <FormHelperText sx={{ color: "red" }}>
                                            {formik.touched.message && formik.errors.message}
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
                    </CardContent>
                </Card>
            </Box>

            {/* Map Section */}
            <Box sx={{ height: "100%", minHeight: { xs: 400, lg: "100vh" }, bgcolor: "grey.200" }}>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19868.687835989404!2d-0.1377869!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1701864150040!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>
        </Box>
    );
};
