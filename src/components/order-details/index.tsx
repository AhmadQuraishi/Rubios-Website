import { Grid, Typography, Divider, Button } from '@mui/material';
import './order-details.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calculateTaxAndFee, orderFees } from '../../helpers/common';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DialogTitle from '@mui/material/DialogTitle';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';

const getOptions = (options: any) => {
  let val = '';
  options.map((item: any) => {
    val = val + ' ' + item.name.trim() + ',';
  });
  return val.trim().replace(/,*$/, '');
};

const OrderDetails = ({ basket, tipPercentage, page }: any) => {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = useState<any[]>();
  const [showMore, setShowMore] = useState(false);
  const utensilsReducer = useSelector((state: any) => state.utensilsReducer);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (basket && basket.products && basket.products.length) {
      let array = basket.products;
      const utensilsIndex = array.findIndex(
        (obj: any) => obj.productId === utensilsReducer.utensilsProductId,
      );
      if (utensilsIndex !== -1) {
        array.push(array.splice(utensilsIndex, 1)[0]);
      }
      setProducts(array);
    } else {
      setProducts([]);
    }
  }, [basket]);

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
              {products &&
                products.map((item: any) => {
                  return (
                    <>
                      <Grid key={item.id} container>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                          <Typography variant="h6" title={item.name} sx={{ fontFamily: 'Librefranklin-Regular !important', }}>
                            {item.productId !==
                              utensilsReducer.utensilsProductId
                              ? item.quantity
                              : ''}
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                          <Typography variant="h6" title={item.name} sx={{ fontFamily: 'Librefranklin-Regular !important', }}>
                            {item.name}
                          </Typography>
                          <Typography
                            title={getOptions(item.choices)}
                            variant="caption"
                            fontSize={11}
                            sx={{ paddingBottom: '5px', display: 'block', }}
                          >
                            {getOptions(item.choices)}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography
                            align={'right'}
                            variant="h6"
                            sx={{ fontFamily: "'Librefranklin-Regular' !important", fontWeight: 'bold !important' }}
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
                  <Typography variant="h6" title="SUB TOTAL" sx={{ fontFamily: 'Librefranklin-Regular !important', }}>
                    SUB TOTAL
                  </Typography>
                  <br />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography
                    align={'right'}
                    variant="h6"
                    title={basket && basket.subtotal.toFixed(2)}
                    sx={{ fontFamily: "'Librefranklin-Regular' !important", fontWeight: 'bold !important' }}
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
                              : 'REWARD '}
                            <i
                              style={{
                                fontWeight: 'normal',
                                fontFamily: 'Librefranklin-Regular !important',
                                fontSize: '15px',
                              }}
                            >
                              {discount.description}
                            </i>
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography align={'right'} variant="h6" sx={{ fontFamily: "'Librefranklin-Regular' !important", fontWeight: 'bold !important' }}>
                            {/*-$*/}
                            {/*{basket.discounts[0].amount > basket.subtotal*/}
                            {/*  ? parseFloat(basket.subtotal.toString()).toFixed(2)*/}
                            {/*  : parseFloat(*/}
                            {/*      basket.discounts[0].amount.toString(),*/}
                            {/*    ).toFixed(2)}*/}
                            -${discount.amount && discount.amount.toFixed(2)}
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
                        sx={{ fontFamily: "'Librefranklin-Regular' !important", fontWeight: 'bold !important' }}
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
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="h6"
                        className="n-bold"
                      // title="ESTIMATED TAX AND FEES"
                      >
                         { 
                          basket?.totalfees > 0 ? (
                            <>
                            <Typography sx={{
                          fontWeight: "none",fontSize: '16px', cursor: 'pointer',fontFamily: "Librefranklin-Regular !important"}} onClick={() => {
                                    setShowMore(!showMore);
                                  }}>
                              ESTIMATED TAX AND FEES
                              {showMore ? (
                                <ExpandLessIcon
                                  aira-label="Expand Less"
                                  onClick={() => {
                                    setShowMore(!showMore);
                                  }}
                                  // className={classes.helpicon}
                                  style={{
                                    cursor: 'pointer',
                                    verticalAlign: 'bottom',
                                    color: 'secondary.main',
                                  }}
                                />
                              ) : (
                                <ExpandMoreIcon
                                  aira-label="Expand Less"
                                  onClick={() => {
                                    setShowMore(!showMore);
                                  }}
                                  // className={classes.helpicon}
                                  style={{
                                    cursor: 'pointer',
                                    verticalAlign: 'bottom',
                                    color: 'secondary.main',
                                  }}
                                />
                              )}
                             </Typography>
                          </>
                        ) : (
                          <Typography sx={{fontSize: "16px",fontFamily: "Librefranklin-Regular !important", fontWeight: "none"}}>
                          ESTIMATED TAXES
                          </Typography>
                        )}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                {!showMore &&              <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography align={'right'} className="n-bold" sx={{  fontSize: "16px !important",Color: "#58595b",fontWeight: "none",fontFamily: "Librefranklin-Regular !important"}} >
                      ${calculateTaxAndFee(basket)}
                    </Typography>
                  </Grid>
                }
              </Grid>
            </li>
            {showMore && (
              <li>
                <Grid
                // open={open}
                // onClose={handleClose}
                // aria-labelledby="alert-dialog-title"
                // aria-describedby="alert-dialog-description"
                // TransitionProps={{
                //   role: 'dialog',
                //   'aria-modal': 'true',
                //   'aria-label': 'Add Gift Card',
                // }}
                >
                  <Grid>
                    <Grid container className={'taxes'} spacing={1}>
                      <Grid item xs={9} >
                      <Typography className="text-info-title"sx={{color: "#58595b",fontWeight: 'none',paddingTop: "3px",fontFamily: 'Librefranklin-Regular !important',marginLeft: "22px !important"}}>
                          SALES TAX:
                        </Typography>
                      </Grid>
                      <Grid item xs={3} justifyContent={'flex-end'}>
                      <Typography className="text-info-desc" sx={{ color: "#58595b",fontFamily: "'Librefranklin-Regular' !important", fontWeight: 'none !important'}}>
                          $
                          {basket &&
                            basket.taxes &&
                            basket.taxes
                              .reduce(
                                (sum: number, tax: any) => sum + tax.tax,
                                0,
                              )
                              .toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                      <Typography className="text-info-title" sx={{color: "#58595b",paddingBottom: "3px",fontFamily: 'Librefranklin-Regular !important',fontWeight: 'none !important',marginLeft: "22px !important"}}>
                          {
                            basket?.fees?.length &&
                              basket.fees.filter((fee: any) => fee.description === 'UCSD Living Wage Surcharge').length > 0 ?
                              'UCSD Living Wage Surcharge:' : 'SERVICE FEE:'
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                      <Typography className="text-info-desc" sx={{color: "#58595b", fontFamily: "'Librefranklin-Regular' !important",fontWeight: 'none !important'}}>
                          ${orderFees(basket)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </li>
            )
              }
            {basket &&
              basket.customerhandoffcharge &&
              basket.customerhandoffcharge > 0 ? (
              <li>
                <Grid container>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <Typography variant="h6" title="DELIVERY FEE" sx={{color: "#58595b",fontFamily: 'Librefranklin-Regular !important', fontWeight: "500 !important"}}>
                      DELIVERY FEE
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Typography align={'right'} variant="h6" sx={{fontFamily: "'Librefranklin-Regular' !important",fontWeight: "500 !important"}}>
                      ${basket.customerhandoffcharge.toFixed(2)}
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
                  <Typography variant="h6" title="Total" sx={{ fontFamily: 'Librefranklin-Regular !important', fontWeight: 'bold !important' }}>
                    TOTAL
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography
                    align={'right'}
                    variant="h6"
                    title={basket && basket.total.toFixed(2)}
                    sx={{ fontFamily: "'Librefranklin-Regular' !important", fontWeight: 'bold !important' }}
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
