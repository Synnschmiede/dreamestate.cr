import React from 'react';
import {
  Dialog as MuiDialog,
  DialogContent,
  Divider,
  DialogActions,
  Box,
  DialogTitle,
  Button,
  Typography,
  Theme,
  DialogProps,
  ButtonProps,
  SxProps,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export interface IDialogProps {
  open: boolean;
  title?: string;
  size: DialogProps['maxWidth'];
  contentSx?: any;
  fullScreen?: boolean;
  hideCloseIcon?: boolean;
  contentWrappedWithForm?: {
    onSubmit: () => void;
  };
  onClose?: () => void;
  subtitle?: string;

  children?: React.ReactNode;
  actions?: {
    type: 'button' | 'submit';
    variant: ButtonProps['variant'];
    label: string | React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
  }[];
  sx?: SxProps<Theme>;
  rightHeading?: React.ReactNode;
}

export const Dialog: React.FC<IDialogProps> = (props) => {
  const {
    open,
    title,
    subtitle,
    size,
    fullScreen = false,
    hideCloseIcon = false,
    contentWrappedWithForm,
    contentSx,
    actions,
    onClose,
    rightHeading,
  } = props;

  const generateActions = () => {
    if (actions) {
      return (
        <DialogActions sx={{ marginTop: 0.5 }}>
          {actions.map((action) => {
            return (
              <Button
                variant={action.variant}
                color="primary"
                type={action.type}
                disabled={action.disabled}
                onClick={action.onClick}
                size="large"
                sx={{ marginRight: '5px' }}
              >
                {action.label}
              </Button>
            );
          })}
        </DialogActions>
      );
    }
  };

  const renderForm = () => {
    const actionsButtons = generateActions();
    if (contentWrappedWithForm) {
      return (
        <form onSubmit={contentWrappedWithForm.onSubmit}>
          <DialogContent sx={{ overflowY: 'auto' }}>{props.children}</DialogContent>
          <Divider />
          {actionsButtons}
        </form>
      );
    }
    return (
      <>
        <DialogContent sx={contentSx}>{props.children}</DialogContent>
        <Divider />
        {actionsButtons}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <MuiDialog
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
      maxWidth={size}
      fullWidth
      TransitionComponent={fullScreen ? Transition : undefined}
      sx={{
        padding: 2,
        ...props.sx,
      }}
    >
      <DialogTitle
        sx={(theme: Theme) => ({
          background: theme.palette.primary.main,
          color: '#fff',
          padding: '8px 12px',
        })}
      >
        <Box display="flex" justifyContent={'space-between'} alignItems={'center'} sx={{padding: '8px 12px'}}>
          <Typography variant="h4" fontWeight={'bold'}>
            {title}
          </Typography>
          <Box display="flex" justifyContent={'flex-end'} gap={2} alignItems={'center'}>
            {rightHeading && rightHeading}
            {!hideCloseIcon && (
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <CloseIcon />
              </Box>
            )}
          </Box>
        </Box>
        <Typography variant="body1" color="rgb(38, 38, 38)">
          {subtitle}
        </Typography>
      </DialogTitle>
      <Divider />
      {renderForm()}
    </MuiDialog>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
