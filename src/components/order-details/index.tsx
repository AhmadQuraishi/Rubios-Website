import { Grid, Typography, Card, Divider } from '@mui/material';
import './order-details.css';
import React from 'react';
import { utensilsProductId } from '../../helpers/upsells';

const getOptions = (options: any) => {
  let val = '';
  options.map((item: any) => {
    val = val + ' ' + item.name.trim() + ',';
  });
  return val.trim().replace(/,*$/, '');
};

const OrderDetails = ({ basket, tipPercentage, page }: any) => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          className={`order-details order-details-${page}`}
        >
          <Typography fontWeight={500} title="ORDER DETAILS" variant="h2">
            ORDER DETAILS
          </Typography>
          <br />
          <br />
          <ul style={{ listStyle: 'none' }}>
            <li>
              {basket &&
                basket.products &&
                basket.products.map((item: any) => {
                  return (
                    <>
                      <Grid key={item.id} container>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                          <Typography variant="h6" title={item.name}>
                            {item.productId !== utensilsProductId()
                              ? item.quantity
                              : ''}
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
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
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography
                            align={'right'}
                            variant="h6"
                            title={item.totalcost.toFixed(2)}
                          >
                            ${item.totalcost.toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <br />
                    </>
                  );
                })}
            </li>
            <Divider />
            <br />
            <li>
              <Grid container>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <Typography variant="h6" title="SUB TOTAL">
                    SUB TOTAL
                  </Typography>
                  <br />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography
                    align={'right'}
                    variant="h6"
                    title={basket && basket.subtotal.toFixed(2)}
                  >
                    ${basket && basket.subtotal.toFixed(2)}
                  </Typography>
                  <br />
                </Grid>
              </Grid>
            </li>
            {basket && basket.discounts && basket.discounts.length > 0
              ? basket.discounts.map((discount: any) => {
                  return (
                    <>
                      <li>
                        <Grid container>
                          <Grid item xs={9} sm={9} md={9} lg={9}>
                            <Typography variant="h6">
                              {discount.type === 'Coupon'
                                ? 'Coupon Code: '
                                : 'DISCOUNT: '}
                              {discount.description}
                            </Typography>
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Typography align={'right'} variant="h6">
                              {/*-$*/}
                              {/*{basket.discounts[0].amount > basket.subtotal*/}
                              {/*  ? parseFloat(basket.subtotal.toString()).toFixed(2)*/}
                              {/*  : parseFloat(*/}
                              {/*      basket.discounts[0].amount.toString(),*/}
                              {/*    ).toFixed(2)}*/}
                              -${discount.amount}
                            </Typography>
                          </Grid>
                        </Grid>
                      </li>
                    </>
                  );
                })
              : null}
            {basket && basket.tip && basket.tip > 0 ? (
              <>
                <li>
                  <Grid container>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                      <Typography variant="h6" title="TIP">
                        {tipPercentage ? `${tipPercentage}% ` : ''}TIP
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography
                        align={'right'}
                        variant="h6"
                        title={basket && basket.tip.toFixed(2)}
                      >
                        +${basket && basket.tip.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              </>
            ) : null}

            {/*{basket && basket.coupon ? (*/}
            {/*  <Grid container>*/}
            {/*    <Grid item xs={9} sm={9} md={9} lg={9}>*/}
            {/*      <Typography variant="h6" title="TIP">*/}
            {/*        Coupon Code - {basket.coupon.couponcode}*/}
            {/*      </Typography>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={3} sm={3} md={3} lg={3}>*/}
            {/*      <Typography align={'right'} variant="h6">*/}
            {/*        -${basket.coupondiscount}*/}
            {/*      </Typography>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*) : null}*/}
            <li>
              <Grid container>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <Typography
                    variant="h6"
                    className="n-bold"
                    title="ESTIMATED Tax"
                  >
                    ESTIMATED TAX
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography align={'right'} className="n-bold" variant="h6">
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
            </li>
            {basket && basket.totalfees && basket.totalfees > 0 ? (
              <li>
                <Grid container>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <Typography variant="h6" title="DELIVERY FEE">
                      DELIVERY FEE
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Typography align={'right'} variant="h6">
                      ${basket.totalfees.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            ) : null}

            <br />
            <Divider />
            <br />
            <li>
              <Grid container>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <Typography variant="h6" title="Total">
                    TOTAL
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography
                    align={'right'}
                    variant="h6"
                    title={basket && basket.total.toFixed(2)}
                  >
                    ${basket && basket.total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          </ul>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetails;
