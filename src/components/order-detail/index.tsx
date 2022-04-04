import React from 'react';
import { Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import './order-detail.css';

const getOptions = (options: any) => {
  let val = '';
  options.map((item: any) => {
    val = val + ' ' + item.name.trim() + ',';
  });
  return val.trim().replace(/,*$/, '');
};

const OrderDetail = ({ basket, tipPercentage }: any) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} className="order-detail">
        <Typography fontWeight={500} title="ORDER DETAILS" variant="h4">
          ORDER DETAILS
        </Typography>
        <br />
        {basket &&
          basket.products &&
          basket.products.map((item: any) => {
            return (
              <>
                <Grid key={item.id} container>
                  <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h6" title={item.name}>
                      {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} lg={10}>
                    <Typography variant="h6" title={item.name}>
                      {item.name}
                    </Typography>
                    <Typography
                      title={getOptions(item.choices)}
                      variant="caption"
                      fontSize={11}
                      sx={{ paddingBottom: '5px', display: 'block' }}
                    >
                      {getOptions(item.choices)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={1}>
                    <Typography variant="h6" title={item.totalcost}>
                      ${item.totalcost}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
              </>
            );
          })}
        <Divider />
        <br />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title="SUB TOTAL">
              SUB TOTAL
            </Typography>
            <br />
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title={basket && basket.subtotal}>
              ${basket && basket.subtotal}
            </Typography>
            <br />
          </Grid>
        </Grid>
        {basket && basket.tip && basket.tip > 0 ? (
          <Grid container>
            <Grid item xs={10} sm={10} md={10} lg={11}>
              <Typography variant="h6" title="TIP">
                {tipPercentage ? `${tipPercentage}% ` : ''}TIP
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={1}>
              <Typography variant="h6" title={basket && basket.tip}>
                +{basket && basket.tip}
              </Typography>
            </Grid>
          </Grid>
        ) : null}

        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" className="n-bold" title="Tax">
              TAX
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6">
              $
              {basket &&
                basket.taxes &&
                basket.taxes.reduce(
                  (sum: number, tax: any) => sum + tax.tax,
                  0,
                )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" className="n-bold" title="Tax">
              TOTAL FEE
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6">
              ${basket && basket.totalfees && basket.totalfees.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
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
