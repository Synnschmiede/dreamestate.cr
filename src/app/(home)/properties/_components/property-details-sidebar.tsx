import { TextField } from "@mui/material"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { useFormik } from "formik";

export const PropertyDetailsSidebar = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues,
        setFieldValue,
    } = useFormik({
        initialValues: {},
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
        <Box sx={
            {
                backgroundColor: "background.paper",
                padding: 4,
                borderRadius: .5
            }
        }>
            {/* user profile */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                    src="/assets/profile_picture.png"
                    alt="Ralph Edwards"
                    sx={{ width: 58, height: 58 }}
                    variant="rounded"
                />
                <Box>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.secondary"
                    >
                        Ralph Edwards
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.disabled"
                    >
                        email: qHt5S@example.com
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
                <Button variant="outlined" color="primary" fullWidth>
                    Call
                </Button>
                <Button variant="outlined" color="success" fullWidth>
                    WhatsApp
                </Button>
            </Box>
        </Box>
    )
}