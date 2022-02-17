import React from 'react';
import { Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import './order-detail.css';

const OrderDetail = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} className="order-detail">
        <Typography fontWeight={500} title="ORDER DETAILS" variant="h4">
          ORDER DETAILS
        </Typography>
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="Mexican street corn taco plate">
              Mexican street corn taco plate
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title="$12.50">
              $12.50
            </Typography>
          </Grid>
        </Grid>
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="Regular Mango tea">
              Regular Mango tea
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title="$2.50">
              $2.50
            </Typography>
          </Grid>
        </Grid>
        <br/>
        <Divider />
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="SUB TOTAL">
              SUB TOTAL
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title="$15.30">
              $15.30
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="Tax">
              TAX
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title="$1.53">
              $1.53
            </Typography>
          </Grid>
        </Grid>
        <br/>
        <Divider />
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="Total">
              TOTAL
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title="$16.53">
              $16.53
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderDetail;
