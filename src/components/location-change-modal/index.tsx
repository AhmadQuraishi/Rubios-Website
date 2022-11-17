import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
import { Button, Grid } from '@mui/material';
import { ItemsNotAvailableComponent } from './items-not-available';
import { ItemsAvailableComponent } from './items-available';
const useStyles = makeStyles((theme: Theme) => ({
  paper: { minWidth: '65%', minHeight: '550px', margin: 'auto !important',backgroundColor:
  `${theme.palette.background.paper} !important`, },
  root: {
    [theme.breakpoints.down(480)]: {
    ' & .MuiBackdrop-root': {

       backgroundColor: 
      `transparent !important`,

    },
    }
  },
}));

export const LocationChangeModal = ({
  showLocationChangeModal,
  setShowLocationChangeModal,
  itemsNotAvailable,
  restaurant,
  handleCancelChangeLocation,
  handleChangeLocation,
}: any) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  // const handleClickOpenOrder = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
    setShowLocationChangeModal(false);
  };

  useEffect(() => {
    setOpen(showLocationChangeModal);
  }, [showLocationChangeModal]);
  return (
    <Grid>
      <Dialog
        fullScreen={fullScreen}
        onBackdropClick={() => setOpen(true)}
        className={classes.root }
        classes={{ paper: classes.paper}}
        // style={{background: 'transparent !important'}}
        onClose={handleClose}
        PaperProps={{
          sx: {
            marginTop: { xs: '70px !important', sm: '0%', lg: '0%', md: '0%' },
            boxShadow: {xs:'none'}
          },
        }}
        TransitionProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': 'Change Location Modal',
        }}
        open={open}
        aria-labelledby="modal-location-change"
        aria-describedby="modal-location-change"
      >
        {' '}
        <IconButton sx={{ marginLeft: 'auto', marginRight: "10px", marginTop: "5px" }} onClick={() => handleClose()}>
          <CloseIcon  sx={{color: "#0075BF"}}/>
        </IconButton>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            textAlign: 'center',    
            justifyContent: {xs:'center',},
            display: {xs:'flex',},
            flexDirection: {xs:'column',},
            marginBottom: { xs:'117px', lg: '0%'},
            marginTop: { xs: '10%', lg: '10%', md: '10%', sm: '10%' },
            marginLeft: { xs: '5%', lg: '20%' },
            marginRight: { xs: '5%', lg: '20%' },

          }}
        >
          {itemsNotAvailable?.length > 0 ? (
            <ItemsNotAvailableComponent items={itemsNotAvailable} />
          ) : (
            <ItemsAvailableComponent restaurant={restaurant} />
          )}

          <Grid sx={{ alignSelf: 'center' }}>
            <Button
              aria-label={`${
                itemsNotAvailable?.length > 0
                  ? 'KEEP ORIGINAL LOCATION'
                  : 'CANCEL LOCATION CHANGE'
              }`}
              title={`${
                itemsNotAvailable?.length > 0
                  ? 'KEEP ORIGINAL LOCATION'
                  : 'CANCEL LOCATION CHANGE'
              }`}
              onClick={() => {
                handleClose();
                handleCancelChangeLocation();
              }}
              sx={{
                boxShadow: '0px 3px 3px 2px rgba(0, 0, 0, 0.2) !important',
                color: '#0075BF',
                backgroundColor: 'White',
                width: '100%',
                marginBottom: '10px',
                height: '70px',
              }}
            >
              {`${
                itemsNotAvailable?.length > 0
                  ? 'KEEP ORIGINAL LOCATION'
                  : 'CANCEL LOCATION CHANGE'
              }`}
            </Button>
            <Button
              aria-label={`${
                itemsNotAvailable?.length > 0 ? 'CHANGE LOCATION' : 'CONFIRM'
              }`}
              variant="contained"
              title={`${
                itemsNotAvailable?.length > 0 ? 'CHANGE LOCATION' : 'CONFIRM'
              }`}
              onClick={() => {
                handleClose();
                handleChangeLocation();
              }}
              sx={{
                letterSpacing: '0.2em !important',
                width: '100%',
                marginBottom: '10px',
                height: '70px',
              }}
            >
              {`${
                itemsNotAvailable?.length > 0 ? 'CHANGE LOCATION' : 'CONFIRM'
              }`}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};
