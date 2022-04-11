import React, { useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import './tip.css';
import {
  updateBasketTipAmount,
  updateBasketCouponCode,
} from '../../redux/actions/basket/checkout';

const getPercentageSelected = (basket: any) => {
  let tipPercentArray: any = [];
  let selectedValue = null;
  const percentages = [10, 15, 20];
  percentages.forEach((value: any) => {
    tipPercentArray.push(
      parseFloat(((value * basket.subtotal) / 100).toFixed(2)),
    );
  });
  const selectedIndex = tipPercentArray.findIndex((value: number) => {
    return value === basket.tip;
  });
  if (selectedIndex !== -1) {
    selectedValue = percentages[selectedIndex];
  }
  return selectedValue;
};

const Tip = ({ basket, loading, updateOrderDetailTipPercent }: any) => {
  const dispatch = useDispatch();

  const [tipPercentage, setTipPercentage] = React.useState(0);
  const [tipCustomAmount, setTipCustomAmount] = React.useState<any>(null);
  const [couponCode, setCouponCode] = React.useState('');
  const [runOnce, setRunOnce] = React.useState(true);

  useEffect(() => {
    if (basket && basket.tip) {
      console.log('working', basket);
      if (basket.tip && basket.tip !== 0 && runOnce) {
        const selectedValue = getPercentageSelected(basket);
        if (selectedValue) {
          setTipPercentage(selectedValue);
        }
        setRunOnce(false);
      }
      setTipCustomAmount(basket.tip);
    }
  }, [basket]);

  const updateTipAmountCall = (tip: any) => {
    if (tip) {
      const payload = {
        amount: tip,
      };
      dispatch(updateBasketTipAmount(basket.id, payload));
    }
  };

  const updateCouponCodeCall = (coupon: string) => {
    const payload = {
      couponcode: coupon,
    };
    dispatch(updateBasketCouponCode(basket.id, payload));
  };

  const handleTipPercentage = (
    event: React.MouseEvent<HTMLElement>,
    value: number,
  ) => {
    // console.log('event', ev)
    setTipPercentage(value);
    let totalPerc = ((value * basket.subtotal) / 100).toFixed(2);
    setTipCustomAmount(totalPerc);
    updateTipAmountCall(totalPerc);
  };

  const handleTipCustomAmountChange = (event: any) => {
    let newValue = event.target.value >= 0 ? event.target.value : 0;
    console.log('newValue', newValue);
    setTipCustomAmount(newValue.trim());
    setTipPercentage(0);
  };

  const handleCouponCodeChange = (event: any) => {
    setCouponCode(event.target.value);
  };

  const IconTip = () => (
    <Button
      onClick={() => {
        updateTipAmountCall(tipCustomAmount);
        setTipPercentage(0);
      }}
      disabled={loading || !tipCustomAmount}
      aria-label="proceed"
    >
      <ArrowRightAltIcon />
    </Button>
  );

  const IconCoupon = () => (
    <Button
      onClick={() => updateCouponCodeCall(couponCode)}
      aria-label="proceed"
    >
      <ArrowRightAltIcon />
    </Button>
  );

  useEffect(() => {
    updateOrderDetailTipPercent(tipPercentage);
  }, [tipPercentage]);

  return (
    <Grid container className="tip-wrapper">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={0} md={2} lg={2} />
          {basket?.allowstip ? (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Typography variant="h1">TIP</Typography>
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
                      selected={tipPercentage === 10}
                      value={10}
                      className="selected-btn"
                    >
                      10%
                    </ToggleButton>
                    {/* </Grid>
                      <Grid item xs={4} sm={4} md={3} lg={3}> */}
                    <ToggleButton
                      selected={tipPercentage === 15}
                      value={15}
                      className="selected-btn"
                    >
                      15%
                    </ToggleButton>
                    {/* </Grid> */}
                    {/* <Grid item xs={4} sm={4} md={3} lg={3}> */}
                    <ToggleButton
                      selected={tipPercentage === 20}
                      value={20}
                      className="selected-btn"
                    >
                      20%
                    </ToggleButton>
                    {/* </Grid>
                    </Grid> */}
                  </ToggleButtonGroup>
                </FormControl>
                <Grid item xs={12} md={9} lg={9}>
                  <TextField
                    className="action-btn"
                    value={tipCustomAmount || ''}
                    type="text"
                    onChange={handleTipCustomAmountChange}
                    label="Custom Amount"
                    aria-label="custom amount"
                    title="Custom Amount"
                    // inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
                    InputProps={{
                      endAdornment: <IconTip />,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          <Grid item xs={12} sm={6} md={4} lg={4} className="coupon-sec">
            <Grid container>
              <Typography variant="h1">COUPON CODE</Typography>
              <Grid item xs={12}>
                <TextField
                  className="action-btn"
                  label="Enter Code"
                  type="text"
                  onChange={handleCouponCodeChange}
                  aria-label="Enter Code"
                  InputProps={{ endAdornment: <IconCoupon /> }}
                  title="Enter Code"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={0} md={2} lg={2} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tip;
