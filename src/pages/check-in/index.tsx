import React from 'react';
import { Grid, Box, Button, TextField, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
import LeftMenuBar from '../../components/left-menu-bar';

const CheckIn = () => {
  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={0}
        sm={3}
        lg={2}
        sx={{ display: { xs: 'none', sm: 'grid' } }}
      >
        <LeftMenuBar />
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        lg={10}
        sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
      >
        <Grid container>
          <Grid item xs={12} md={10}>
            <Grid container>
              <Grid item xs={12} md={5}>
                <Typography variant="h4">CHECK-IN</Typography>
                <Typography variant="body1">
                  To check-in for your visit , Enter the Rubio's Rewards barcode
                  number located at the bottom of your receipt.
                </Typography>
                <Box
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                  component="img"
                  alt="Receipt Image"
                  aria-label="Receipt Image"
                  src={receipt}
                />
                <TextField
                  aria-label="Rubio's rewards barcode number"
                  label="Rubio's rewards barcode number"
                  aria-required="true"
                />
                <Typography variant="body1">
                  Please enter the 12 or 13 digit numeric barcode at the bottom
                  of your receipt.
                </Typography>
                <Typography variant="body1">
                  Please ensure that you enter any leading zeros that may appear
                  in the barcode e.g 0600101234124.
                </Typography>
                <Button variant="outlined">SUBMIT</Button>
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
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={2} />
          <Grid item xs={12}>
            <Button sx={{ display: { xs: 'flex', sm: 'none' } }}>back</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckIn;
