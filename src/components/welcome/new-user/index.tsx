import { Grid, Typography } from '@mui/material';

const WelcomeNewUser = () => {
  return (
    <Grid container spacing={1} columns={16}>
      <Grid item xs={16} sm={8} md={16} lg={16}>
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
