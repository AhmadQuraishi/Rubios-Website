import { makeStyles } from '@mui/styles';
import { Grid, Typography, Card, TextField, Button } from '@mui/material';
import OrderDetails from '../../components/order-details';
import OrderConfirmedCard from '../../components/order-confirm-card';
import { Fragment, useEffect } from 'react';
import './order-confirmation.css';
import { useDispatch } from 'react-redux';
import { removeBasketOrderConfirmation } from '../../redux/actions/basket/checkout';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#73aac7',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginTop: '40px',
    marginLeft: '40px',
  },
}));

const OrderConfirmation = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(removeBasketOrderConfirmation())
  }, [])
  
  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container className="order-confirmation">
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <OrderConfirmedCard />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Card className="card">
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <Typography variant="caption" className="label white" title="EARN REWARDS">EARN REWARDS</Typography>
                    <Typography variant="h4" className="white" title="GET $5 OFF YOUR">GET $5 OFF YOUR</Typography>
                    <Typography variant="h4" className="white" title="NEXT ORDER">NEXT ORDER</Typography>
                    <br/>
                    <Typography variant="h6" className="white" title="Join today for completing the form below">Join today for completing the form below</Typography>
                    <br/>
                    <img className="phone-icon" src={require('../../assets/imgs/phone-icon.png')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <TextField
                        aria-label="first name"
                        placeholder="Jhonathen"
                        title="first name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <TextField
                        aria-label="last name"
                        placeholder="Doe"
                        title="last name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <TextField
                        aria-label="email"
                        placeholder="ilovetacos@email.com"
                        title="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <TextField
                        aria-label="date of birth"
                        placeholder="11/19/1993"
                        title="date of birth"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        fullWidth
                        placeholder="#000 Broadway St.San Diego Ca."
                        aria-label="street address"
                        title="street address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <TextField
                        aria-label="password"
                        placeholder="*****"
                        type="password"
                        title="password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <TextField
                        aria-label="confirm password"
                        placeholder="*****"
                        type="confirm password"
                        title="confirm password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Button aria-label="view account" variant="contained" title="Sign Up">SIGN UP</Button>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <OrderDetails
            name1="Maxicon street Corn Toca Plate"
            price1="$12.50"
            name2="Regular Mango Tea"
            price2="$2.50"
            reward=""
            rewardPrice=""
            subTotal="SUB TOTAL"
            subTotalPrice="$15.00"
            tax="TAX"
            taxPrice="$1.53"
            total="TOTAL"
            totalPrice="$16.53"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default OrderConfirmation;
