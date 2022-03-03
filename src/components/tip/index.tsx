import React from 'react';
import { Button, Grid, RadioGroup, TextField, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './tip.css';
import {updateBasketTipAmount, updateBasketCouponCode} from '../../redux/actions/basket/checkout';

const Tip = ({basket}: any)  => {
  const dispatch = useDispatch();
 
  const [tipPercentage, setTipPercentage] = React.useState(0);
  const [tipCustomAmount, setTipCustomAmount] = React.useState(0);
  const [couponCode, setCouponCode] = React.useState('');

  const updateTipAmountCall = (tip: number) => {
    const payload = {
      amount: tip
    }
    dispatch(updateBasketTipAmount(basket.id, payload))
  }

  const updateCouponCodeCall = (coupon: string) => {
    const payload = {
      couponcode: coupon
    }
    dispatch(updateBasketCouponCode(basket.id, payload))
  }

  const handleTipPercentage = (event: React.MouseEvent<HTMLElement>, value: number ) => {
    console.log('setTipPercentage', value)
    setTipPercentage(value);
    setTipCustomAmount(0);
    const totalPerc = (value * basket.total) / 100;
    updateTipAmountCall(totalPerc)
  };

  const handleTipCustomAmountChange = (event: any) => {
    setTipCustomAmount(event.target.value);
    setTipPercentage(0)
  }

  const handleCouponCodeChange = (event: any) => {
    setCouponCode(event.target.value);
  }

  const IconTip = () => (
    <Button onClick={() => updateTipAmountCall(tipCustomAmount)} aria-label="proceed">
      <ArrowRightAltIcon />
    </Button>
  );

  const IconCoupon = () => (
    <Button onClick={() => updateCouponCodeCall(couponCode)} aria-label="proceed">
      <ArrowRightAltIcon />
    </Button>
  );

  return (
    <Grid container className="tip-wrapper">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={0} md={2} lg={2}/>
          {
            basket?.allowstip ? (
              <Grid item xs={12} sm={6} md={4} lg={4}>
              <Typography variant="h4">TIP</Typography>
              <Grid container>
                <FormControl>
                  <ToggleButtonGroup
                    value={tipPercentage}
                    exclusive
                    onChange={handleTipPercentage}
                  >
                    {/* <Grid container spacing={2}>
                      <Grid item xs={4} sm={4} md={3} lg={3}> */}
                        <ToggleButton                              
                          selected={ tipPercentage === 10 ? true : false}
                          value={10} 
                          className="selected-btn"
                        >
                          10%
                        </ToggleButton>
                      {/* </Grid>
                      <Grid item xs={4} sm={4} md={3} lg={3}> */}
                      <ToggleButton                              
                          selected={ tipPercentage === 20 ? true : false}
                          value={20} 
                          className="selected-btn"
                        >
                          20%
                        </ToggleButton>
                      {/* </Grid> */}
                      {/* <Grid item xs={4} sm={4} md={3} lg={3}> */}
                      <ToggleButton                              
                          selected={ tipPercentage === 30 ? true : false}
                          value={30} 
                          className="selected-btn"
                        >
                          30%
                        </ToggleButton>
                      {/* </Grid>
                    </Grid> */}
                  </ToggleButtonGroup>
                </FormControl>
                <Grid item xs={12} md={9} lg={9}>
                  <TextField
                    className="action-btn"
                    value={tipCustomAmount}
                    type="number"
                    onChange={handleTipCustomAmountChange}
                    label="Custom Amount"
                    aria-label="custom amount"
                    InputProps={{ endAdornment: <IconTip /> }}
                    title="Custom Amount"
                  /> 
                </Grid>
              </Grid>
            </Grid> 
            ) : (null)
          }
          
          <Grid item xs={12} sm={6} md={4} lg={4} className="coupon-sec">
            <Grid container>
              <Typography variant="h4">COUPON CODE</Typography>
              <Grid item xs={12}>
                <TextField
                  className="action-btn"
                  label="Enter Code"
                  type="text"
                  onChange={handleCouponCodeChange}
                  aria-label="Enter Code"
                  InputProps={{ endAdornment: <IconCoupon /> }}
                  title="Enter Code"
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={0} md={2} lg={2}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tip;
