import { Grid, Typography } from '@mui/material';
import './new-user.css';

const WelcomeNewUser = () => {
  return (
    <Grid container columns={16}>
      <Grid item xs={16} sm={8} md={8.5} lg={8.5} className="qr-container">
        <img
          src={require('../../../assets/imgs/scan-to-downlad-qrcode.png')}
          alt={'Scan to download QR Code'}
        />
        <Typography variant="h6">Scan to download to your phone</Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeNewUser;
