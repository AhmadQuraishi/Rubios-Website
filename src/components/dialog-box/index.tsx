import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Button } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  message: string;
  handleDeleteFunction: () => void;
};

const DialogBox: React.FC<Props> = ({
  open,
  message,
  handleClose,
  handleDeleteFunction,
}: Props) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': 'Alert Modal',
        }}
      >
        <DialogTitle>
          <Typography variant="h6">{message}</Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            aria-label="No"
            title="No"
            className="link"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            aria-label="Yes"
            title="Yes"
            className="link default"
            onClick={handleDeleteFunction}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
