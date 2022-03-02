import React from 'react';
import { Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import './order-detail.css';

const OrderDetail = ({basket}: any)  => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} className="order-detail">
        <Typography fontWeight={500} title="ORDER DETAILS" variant="h4">
          ORDER DETAILS
        </Typography>
        <br/>
        {
          basket && basket.products && basket.products.map((item: any) => {
            return (
              <>
                <Grid key={item.id} container>
                  <Grid item xs={10} sm={10} md={10} lg={11}>
                    <Typography variant="h6" title={item.name}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={1}>
                    <Typography variant="h6" title={item.totalcost}>
                      ${item.totalcost}
                    </Typography>
                  </Grid>
                </Grid>
                <br/>
              </>              
            )
          })
        }
        <Divider />
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="SUB TOTAL">
              SUB TOTAL
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
             <Typography variant="h6" title={basket && basket.subtotal}>
              ${basket && basket.subtotal}
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
            <Typography variant="h6" >
            ${basket && basket.taxes && basket.taxes.reduce((sum: number, tax: any) => sum + tax.tax, 0)}
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
            <Typography variant="h6" title={basket && basket.total}>
              ${basket && basket.total}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderDetail;
