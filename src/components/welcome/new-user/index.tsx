import { Grid, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import './new-user.css';
import andriodLogo from '../../../assets/imgs/button-google.png';
import iosLogo from '../../../assets/imgs/button-apple.png';

const WelcomeNewUser = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
    {isMobile ?
    <Grid container columns={12} sx={{justifyContent: 'center'}}>
    <Grid item xs={12} sm={8} md={8.5} lg={8.5}>
          <Grid container sx={{ marginLeft: {sm: '12%', xs: '12%', md:'30%'}}}>
            <Grid item xs={12}>
              <Button sx={{ padding: 0 }}>
              <a href={process.env.REACT_APP_IOS_DOWNLOAD_LINK} target= '_blank'>
                <img
                  style={{ display: 'inline-block', width: '100%' }}
                  src={iosLogo}
                  alt="Click Here To Download Our From Apple Store"
                />
                </a>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ padding: 0 }}>
                <a href={process.env.REACT_APP_GOOGLE_DOWNLOAD_LINK} target= '_blank'>
                <img
                  style={{ display: 'inline-block', width: '100%' }}
                  src={andriodLogo}
                  alt="Click Here To Download Our From Google App Store"
                />
                </a>
              </Button>
            </Grid>
          </Grid>
          </Grid>
      </Grid>
          :
      <Grid  container columns={16}>
      <Grid item xs={16} sm={8} md={8.5} lg={8.5} className="qr-container"> 
            <img
              style={{ width: '100%' }}
              src={require('../../../assets/imgs/scan-to-downlad-qrcode-2.jpg')}
              alt={'Scan to download QR Code'}
            />
            <Typography variant="h6">
              Scan the QR code for download links.
            </Typography>
            </Grid>
        </Grid>
        }
      </>
  );
};

export default WelcomeNewUser;
