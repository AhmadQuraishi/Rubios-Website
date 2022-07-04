import { Grid, Typography } from '@mui/material';
import './new-user.css';

const WelcomeNewUser = () => {
  return (
    <Grid container columns={16}>
      <Grid item xs={16} sm={8} md={8.5} lg={8.5} className="qr-container">
        <img
          style={{width: '100%'}}
          src={require('../../../assets/imgs/scan-to-downlad-qrcode-2.jpg')}
          alt={'Scan to download QR Code'}
        />
        <Typography variant="h6">
          Scan the QR code for download links.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeNewUser;
