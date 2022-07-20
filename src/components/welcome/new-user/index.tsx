import { Grid, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import './new-user.css';
import andriodLogo from '../../../assets/imgs/button-google.png';
import iosLogo from '../../../assets/imgs/button-apple.png';

const WelcomeNewUser = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container columns={16}>
    {isMobile ?
    <Grid item xs={16} sm={8} md={8.5} lg={8.5} >
          <Grid container>
            <Grid item xs={12}>
              <Button sx={{ padding: 0 }}>
                <img
                  style={{ display: 'inline-block', width: '60%' }}
                  src={iosLogo}
                  alt="Click Here To Download Our From Apple Store"
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ padding: 0 }}>
                <img
                  style={{ display: 'inline-block', width: '60%' }}
                  src={andriodLogo}
                  alt="Click Here To Download Our From Google App Store"
                />
              </Button>
            </Grid>
          </Grid>
          </Grid>
          :
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
        }
      </Grid>
  );
};

export default WelcomeNewUser;
