import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { Grid, Typography} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
export const CacheDialog = (props: any)  =>{
    const {
        type,
        openModal,
        setOpenModal,
      } = props;
    const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down(480));

  const handleClose = () => {
    setOpenModal(false);
    navigate('/location');
  };
  const backdropClose = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={backdropClose}
        PaperProps={{
          sx: {
            marginTop: { xs: '155px !important', sm: '0px !important', lg: '0px !important', md: '0px !important' },
            boxShadow: {xs:'none'}
          },
        }}
      >
        <Grid sx={{ display: {xs: "flex"},flexDirection: {xs:"column"},marginTop: {xs:"inherit"}}}>
            <Typography
            sx={{
              lineHeight: '1.1 !important',
              textAlign: 'center',
              color: '#062C43 !important',
              fontSize: '32px',
              fontWeight: '900',
              marginTop : '30px',
              ttextAlign: 'center',
              fontFamily: "'Sunborn-Sansone' !important",
            }}
          >
            Session Expired
          </Typography>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your order has been reset due to inactivity more than 30 minutes.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{marginBottom : '20px', display: "flex", justifyContent:"center"}}>
          <Button  variant="contained" onClick={() => handleClose()} >Ok</Button>
        </DialogActions>
        </Grid>
      </Dialog>

    </div>
  );
}