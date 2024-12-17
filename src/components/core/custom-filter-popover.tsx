import { Box, Button, Popover, styled } from '@mui/material';
import React, { ReactNode } from 'react';
import { Iconify } from '../iconify';

interface ICustomFilterButtonProps {
  title: string;
  popoverComponent: ReactNode;
}

const StyledButton = styled(Button)(({ theme }) => ({
  border: 'none',
  color: 'text.disabled',
  backgroundColor: 'transparent',
  fontSize: theme.typography.pxToRem(15),
  fontWeight: 400,
}));

export const CustomFilterPopover: React.FC<ICustomFilterButtonProps> = ({
  title,
  popoverComponent,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  // Open/Close Popover Handlers
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <StyledButton
        variant="text"
        onClick={handleOpen}
        endIcon={
          open ? (
            <Iconify icon="pixelarticons:chevron-up" />
          ) : (
            <Iconify icon="pixelarticons:chevron-down" />
          )
        }
      >
        {title}
      </StyledButton>

      {/* popover */}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ padding: 2, width: 250 }}>
          {React.cloneElement(popoverComponent as React.ReactElement, { handleClose })}
        </Box>
      </Popover>
    </>
  );
};
