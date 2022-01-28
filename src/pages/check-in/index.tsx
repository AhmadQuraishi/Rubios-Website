import React from 'react';
import { Grid, Box, Button, TextField, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
import LeftMenuBar from '../../components/left-menu-bar';

const CheckIn = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <LeftMenuBar />
      </Grid>
      <Grid item xs={10} sx={{ padding: '50px' }}>
        <Box>
          <Grid container>
            {/*column for space*/}
            <Grid item xs={1} sm={1} md={1} lg={1} />

            <Grid item xs={10} sm={10} md={9} lg={9}>
              <Grid container>
                <Grid item xs={12} md={5}>
                  <Typography variant="h4">CHECK-IN</Typography>
                  <Typography variant="body1">
                    To check-in for your visit , Enter the Rubio's Rewards
                    barcode number located at the bottom of your receipt.
                  </Typography>
                  <TextField></TextField>
                  <Typography variant="body1">
                    Please enter the 12 or 13 digit numeric barcode at the
                    bottom of your receipt.
                  </Typography>
                  <Typography variant="body1">
                    Please ensure that you enter any leading zeros that may
                    appear in the barcode e.g 0600101234124.
                  </Typography>
                  <Button variant="outlined">SUBMIT</Button>
                </Grid>

                {/*column for space*/}
                <Grid item xs={0} md={2} />

                <Grid item xs={12} md={5}>
                  <Box
                    component="img"
                    alt="Receipt Image"
                    aria-label="Receipt Image"
                    src={receipt}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/*column for space*/}
            <Grid item xs={1} sm={1} md={2} lg={2} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CheckIn;
