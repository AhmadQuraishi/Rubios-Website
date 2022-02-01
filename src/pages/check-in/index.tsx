import { Grid, Box, Button, TextField, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';

const CheckIn = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={10}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" title="CHECK-IN">
              CHECK-IN
            </Typography>
            <Typography
              variant="body1"
              title="To check-in for your visit , Enter the Rubio's Rewards barcode
              number located at the bottom of your receipt."
            >
              To check-in for your visit , Enter the Rubio's Rewards barcode
              number located at the bottom of your receipt.
            </Typography>
            <Box
              sx={{ display: { xs: 'flex', md: 'none' } }}
              component="img"
              alt="Receipt Image"
              aria-label="Receipt Image"
              src={receipt}
              title="Receipt Image"
            />
            <TextField
              aria-label="Rubio's rewards barcode number"
              label="Rubio's rewards barcode number"
              aria-required="true"
              title="Rubio's rewards barcode number"
            />
            <Typography
              variant="body1"
              title="Please enter the 12 or 13 digit numeric barcode at the bottom of
              your receipt."
            >
              Please enter the 12 or 13 digit numeric barcode at the bottom of
              your receipt.
            </Typography>
            <Typography
              variant="body1"
              title="Please ensure that you enter any leading zeros that may appear in
              the barcode e.g 0600101234124."
            >
              Please ensure that you enter any leading zeros that may appear in
              the barcode e.g 0600101234124.
            </Typography>
            <Button variant="outlined" aria-label="SUBMIT" title="SUBMIT">
              SUBMIT
            </Button>
          </Grid>

          {/*column for space*/}
          <Grid item xs={0} md={2} />

          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Box
              component="img"
              alt="Receipt Image"
              aria-label="Receipt Image"
              src={receipt}
              title="Receipt Image"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={2} />
      <Grid item xs={12}>
        <Button
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          aria-label="back"
          title="back"
        >
          back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckIn;
