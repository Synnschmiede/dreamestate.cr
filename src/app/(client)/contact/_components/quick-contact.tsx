import { Box, Grid, Paper, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { pxToRem } from 'src/theme/styles';

export const QuickContact = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} mt={-6}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: pxToRem(500),
          }}
        >
          <Iconify width={52} icon="ic:round-call" />
          <Typography variant="h5">Talk to sales</Typography>
          <Typography textAlign="center">
            Interested in HubSpot’s software? Just pick up the phone to chat with a member of our
            sales team.
          </Typography>
          <Typography
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
            component={'a'}
            href="tel:+65 6 955 6000"
          >
            +65 6 955 6000
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} mt={-6}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: pxToRem(500),
          }}
        >
          <Iconify width={52} icon="mynaui:envelope" />
          <Typography variant="h5">Email us</Typography>
          <Typography textAlign="center">
            Interested in HubSpot’s software? Just pick up the phone to chat with a member of our
            sales team.
          </Typography>
          <Typography sx={{ color: 'primary.main', textDecoration: 'underline' }}>
            sales@dreamestate.com
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} mt={-6}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: pxToRem(500),
          }}
        >
          <Iconify width={52} icon="ic:twotone-whatsapp" />
          <Typography variant="h5">Connect via WhatsApp</Typography>
          <Typography textAlign="center">
            Interested in HubSpot’s software? Just pick up the phone to chat with a member of our
            sales team.
          </Typography>
          <Typography
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
            component={'a'}
            href="https://wa.me/6569556000"
          >
            Send a message
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
