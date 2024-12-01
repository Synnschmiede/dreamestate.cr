import { Box, Grid, Button, Select, MenuItem, TextField, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

export const HeroSection = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(assets/background/hero_bg_4_1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
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
                            pl: { xs: 4, md: 0 },
                            py: { xs: 8, md: 0 }
                        }}
                    >
                        <Typography variant="inherit"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                                fontWeight: 400,
                                mb: {xs: 0, md: -2}
                            }}>
                            Top-Notch Real Estate Properties
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: 'text.main',
                                fontWeight: 700,
                                fontSize: { xs: pxToRem(40), sm: pxToRem(60), md: pxToRem(80) },
                                mb: { xs: -2,  md: -4 }
                            }}
                        >
                            Find Your
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: 'text.main',
                                fontWeight: 700,
                                fontSize: { xs: pxToRem(40), sm: pxToRem(60), md: pxToRem(80) },
                            }}
                        >
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
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            <Box>
                                <Typography variant="h2" sx={{ fontWeight: 500 }}>
                                    65k
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: 18 }}>Satisfied Customers</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ fontWeight: 500 }}>
                                    15k
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: 18 }}>Verified Properties</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                {/* Right Section */}
                <Grid
                    sx={{
                        display: { xs: 'none', md: 'block' },
                    }}
                    item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundImage: 'url(assets/home/hero_thumb_4_1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '100%',
                            minHeight: '600px',
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
