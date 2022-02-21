import { Alert, Snackbar, Slide } from '@mui/material';
import { useEffect, useState } from 'react';

const ErrorMessageAlert = (props: any) => {
  const [open, setOpen] = useState(props.setOpen || true);
  
  const handleClose = () => {
    setOpen(false);
  };
  const { message } = props;
  return (
    <Snackbar
      open={open}
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
        {message || 'This is a error message!'}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessageAlert;
