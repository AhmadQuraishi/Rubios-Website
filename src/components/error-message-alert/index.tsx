import { Alert, Snackbar, Slide } from '@mui/material';
import { useState } from 'react';

const ErrorMessageAlert = (props: any) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const { message } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      TransitionComponent={Slide}
      onClose={handleClose}
      sx={{ alignItems: 'center' }}
    >
      <Alert
        onClose={() => handleClose()}
        severity="error"
        variant="filled"
        sx={{ width: '100%', alignItems: 'center' }}
      >
        <b>Error Message: </b>{message || 'This is a error message!'}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessageAlert;
