import Map from '../../components/map';
import React from 'react';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Divider from '@mui/material/Divider';

const Tip = () => {
  const SearchButton = () => (
    <Button sx={{ bgColor: 'black' }}>
      <ArrowRightAltIcon />
    </Button>
  );
  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={2}></Grid>

      <Grid item xs={10} sm={11} md={11} lg={11} xl={8}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Typography variant="h4">TIP</Typography>
              <Grid item xs={12}>
                <Button variant="contained" key="two">
                  10%
                </Button>
                <Button variant="contained" key="two">
                  15%
                </Button>
                <Button variant="contained" key="two">
                  20%
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Custom Amount"
                  aria-label="custom amount"
                  InputProps={{ endAdornment: <SearchButton /> }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Typography variant="h4">COUPON CODE</Typography>
              <Grid item xs={12}>
                <TextField placeholder="Enter Code"></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={2}></Grid>
    </Grid>
  );
};

export default Tip;
