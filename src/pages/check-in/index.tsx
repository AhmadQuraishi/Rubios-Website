import { Grid, Box, Button, TextField, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
import { Fragment } from 'react';

const CheckIn = () => {
  return (
    <Fragment>
      <Typography variant="h4" title="CHECK-IN">
        CHECK-IN
      </Typography>
      <Grid container>
        <Grid item md={10}>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Grid container>
                <Typography
                  variant="body1"
                  title="To check-in for your visit , Enter the Rubio's Rewards barcode
              number located at the bottom of your receipt."
                >
                  To check-in for your visit , Enter the Rubio's Rewards barcode
                  number located at the bottom of your receipt.
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Box
                  component="img"
                  alt="Receipt Image"
                  aria-label="Receipt Image"
                  src={receipt}
                  title="Receipt Image"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  aria-label="Rubio's rewards barcode number"
                  // label="Rubio's rewards barcode number"
                  placeholder="x-xx-xxxx"
                  aria-required="true"
                  title="Rubio's rewards barcode number"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  title="Please enter the 12 or 13 digit numeric barcode at the bottom of
              your receipt."
                >
                  Please enter the 12 or 13 digit numeric barcode at the bottom
                  of your receipt.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  title="Please ensure that you enter any leading zeros that may appear in
              the barcode e.g 0600101234124."
                >
                  Please ensure that you enter any leading zeros that may appear
                  in the barcode e.g 0600101234124.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  aria-label="SUBMIT"
                  title="SUBMIT"
                  variant="contained"
                  sx={{ width: { xs: '100%', lg: '400px' } }}
                >
                  SUBMIT
                </Button>
              </Grid>
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
    </Fragment>
  );
};

export default CheckIn;
