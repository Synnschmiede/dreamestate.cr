'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import { Lock, VerifiedUser } from '@mui/icons-material';
import { paths } from 'src/routes/paths';
import useAuth from 'src/hooks/useAuth';
import { Button } from '@mui/material';

const user = {
  id: 'USR-000',
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  email: 'sofia@devias.io',
};

export const UserPopover = ({ anchorEl, onClose, open }: {anchorEl: HTMLElement | null, onClose: () => void, open: boolean}) => {
  const { userInfo , logout } = useAuth();
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={Boolean(open)}
      slotProps={{ paper: { sx: { width: '280px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography>{userInfo.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {userInfo.email}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {userInfo.role}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        <MenuItem
          component={RouterLink}
          href={paths.dashboard.myAccount}
          onClick={onClose}
        >
          <ListItemIcon>
            <VerifiedUser />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          component={RouterLink}
          href={paths.dashboard.settings}
          onClick={onClose}
        >
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          Settings
        </MenuItem>

      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        <Button 
        variant='contained'
        fullWidth
        color='inherit'
        onClick={() => {
          localStorage.removeItem('token')
          logout();
        }}
        >
          Signout
        </Button>
      </Box>
    </Popover>
  );
}
