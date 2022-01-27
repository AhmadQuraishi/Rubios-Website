import Map from '../../components/map';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const OrderDetail = () => {
  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={2}></Grid>

      <Grid item xs={10} sm={11} md={11} lg={11} xl={8}>
        <Typography variant="h3">ORDER DETAILS</Typography>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5">Mexican street corn taco plate</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5">$12.50</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5">Regular Mango tea</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5">$2.50</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5">SUB TOTAL</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5">$15.30</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5">TAX</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5">$1.53</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5">TOTAL</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5">$16.53</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={2}></Grid>
    </Grid>
  );
};

export default OrderDetail;
