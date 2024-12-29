import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IConfirmmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmButtonLabel?: string;
}

export const ConfirmationDialog: React.FC<IConfirmmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmButtonLabel = 'Delete',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Warning!'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} autoFocus variant="contained" color="error">
          {confirmButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
