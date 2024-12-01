import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

export const HeroSection = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(assets/background/hero_bg_4_1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                py: 8,
            }}
        >
            <Grid container spacing={0} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            maxWidth: '650px', 
                            ml: 'auto', 
                            pr: { xs: 0, md: 4 },
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                            Top-Notch Real Estate Properties
                        </Typography>
                        <Typography variant="h2" sx={{ color: 'primary.main', mb: 1 }}>
                            Find Your
                        </Typography>
                        <Typography variant="h2" sx={{ color: 'primary.main', mb: 4 }}>
                            Dream Home
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                mb: 4,
                            }}
                        >
                            <TextField
                                placeholder="Listing ID or Location"
                                fullWidth
                                sx={{ flex: 1 }}
                                InputProps={{
                                    startAdornment: <i className="far fa-search" style={{ marginRight: 8 }} />,
                                }}
                            />
                            <Select defaultValue="category" sx={{ minWidth: 120 }}>
                                <MenuItem value="category">Category</MenuItem>
                                <MenuItem value="luxury">Luxury</MenuItem>
                                <MenuItem value="commercial">Commercial</MenuItem>
                            </Select>
                            <Select defaultValue="offer_type" sx={{ minWidth: 120 }}>
                                <MenuItem value="offer_type">Offer Type</MenuItem>
                                <MenuItem value="popularity">Popularity</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                                <MenuItem value="date">Latest</MenuItem>
                            </Select>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
                            >
                                <i className="far fa-search" style={{ marginRight: 8 }} /> Search
                            </Button>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    65k
                                </Typography>
                                <Typography variant="body2">Satisfied Customers</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    15k
                                </Typography>
                                <Typography variant="body2">Verified Properties</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundImage: 'url(assets/home/hero_thumb_4_1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '100%',
                            minHeight: '300px',
                            borderRadius: 2,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
