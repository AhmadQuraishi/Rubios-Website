import React from 'react';
import { Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const OrderDetail = () => {
  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />

      <Grid item xs={10} sm={11} md={11} lg={8}>
        <Typography variant="h4" title="ORDER DETAILS">
          ORDER DETAILS
        </Typography>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title="Mexican street corn taco plate">
              Mexican street corn taco plate
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title="$12.50">
              $12.50
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title="Regular Mango tea">
              Regular Mango tea
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title="$2.50">
              $2.50
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title="SUB TOTAL">
              SUB TOTAL
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title="$15.30">
              $15.30
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="caption" title="Tax">
              TAX
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="caption" title="$1.53">
              $1.53
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title="Total">
              TOTAL
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title="$16.53">
              $16.53
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />
    </Grid>
  );
};

export default OrderDetail;
