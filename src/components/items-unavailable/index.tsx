import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
import { Button, Grid, Typography } from '@mui/material';
const useStyles = makeStyles((theme: Theme) => ({
  paper: { minWidth: '65%', minHeight: '550px' },
}));
export default function ItemsUnavailable() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const handleClickOpenOrder = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid>
      <Dialog
        fullScreen={fullScreen}
        classes={{ paper: classes.paper }}
        PaperProps={{
          sx: {
            marginTop: { xs: '130px', sm: '0%', lg: '0%', md: '0%' },
          },
        }}
        open={open}
        aria-labelledby="modal-dialog-delivery-address"
        aria-describedby="modal-dialog-delivery-address-form"
      >
        {' '}
        <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            textAlign: 'center',
            marginTop: { xs: '10%', lg: '5%', md: '5%', sm: '10%' },
            marginBottom: '5%',
            marginLeft: { xs: '5%', lg: '20%' },
            marginRight: { xs: '5%', lg: '20%' },
          }}
        >
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography
              sx={{
                lineHeight: '1.1 !important',
                textAlign: 'center',
                color: '#214F66',
                fontSize: '32px',
                fontWeight: '900',
                fontFamily: 'Poppins-Bold, sans-serif !important',
              }}
            >
              SORRY, SOME ITEMS AREN'T AVAILABLE AT YOUR NEW LOCATION.
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '16px !important',
                fontFamily: 'Poppins-Regular, sans-serif !important',
              }}
            >
              If you switch locations, the following items will be removed.
            </Typography>
            <br />
            <Typography
              sx={{
                textAlign: 'center',
                color: '#214F66',
                fontSize: '14px !important',
                fontWeight: '600',
                fontFamily: 'Poppins-Regular, sans-serif !important',
              }}
            >
              Mexican Street Corn Taco Plate
            </Typography>
            <br />
            <Typography
              sx={{
                textAlign: 'center',
                color: '#214F66',
                fontSize: '14px !important',
                fontWeight: '600',
                fontFamily: 'Poppins-Regular, sans-serif !important',
                marginBottom: '10px',
              }}
            >
              Regular Mango Tea
            </Typography>
            <br />
          </Grid>
          <Grid
            // lg={6}
            //         xs={12}
            //         md={12}
            //         sm={12}
            sx={{ alignSelf: 'center' }}
          >
            <Button
              aria-label="KEEP ORIGINAL LOCATION"
              title="KEEP ORIGINAL LOCATION"
              name="keep orginal location"
              sx={{
                boxShadow: '0px 3px 3px 2px rgba(0, 0, 0, 0.2) !important',
                color: '#0075BF',
                backgroundColor: 'White',
                width: '100%',
                marginBottom: '10px',
                height: '70px',
              }}
            >
              KEEP ORGINAL LOCATION
            </Button>
            <Button
              aria-label="CHANGE LOCATION"
              variant="contained"
              title="CHANGE LOCATION"
              name="dispatch"
              sx={{
                letterSpacing: '0.2em !important',
                width: '100%',
                marginBottom: '10px',
                height: '70px',
              }}
            >
              CHANGE LOCATION
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
}
