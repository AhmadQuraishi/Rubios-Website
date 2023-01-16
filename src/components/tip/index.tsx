import React, { useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import './tip.css';
import {
  updateBasketTipAmount,
  updateBasketCouponCode,
  removeBasketCouponCode,
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
  const [tipLoading, setTipLoading] = React.useState(true);
  const [couponLoading, setCouponLoading] = React.useState(true);

  useEffect(() => {
    if (basket) {
      if (basket.tip && basket.tip !== 0 && runOnce) {
        const selectedValue = getPercentageSelected(basket);
        if (selectedValue) {
          setTipPercentage(selectedValue);
        }
        setRunOnce(false);
      }
      if (basket.coupon && basket.coupon.couponcode) {
        setCouponCode(basket.coupon.couponcode);
      }
      if (basket.tip) {
        setTipCustomAmount(basket.tip.toFixed(2));
      }
    }
  }, [basket]);

  useEffect(() => {
    if (!loading) {
      setTipLoading(false);
      setCouponLoading(false);
    }
  }, [loading]);

  const updateTipAmountCall = (tip: any) => {
    if (tip) {
      const payload = {
        amount: tip,
      };
      setTipLoading(true);
      dispatch(updateBasketTipAmount(basket.id, payload));
    }
  };

  const updateCouponCodeCall = (coupon: string) => {
    if (basket && basket.coupon && basket.coupon.couponcode) {
      setCouponLoading(true);
      dispatch(removeBasketCouponCode(basket.id, ''));
    } else if (coupon.length) {
      const payload = {
        couponcode: coupon,
      };
      setCouponLoading(true);
      dispatch(updateBasketCouponCode(basket.id, payload));
    }
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
    setCouponCode(event.target.value.trim());
  };

  const IconTip = () => (
    <Button
      onClick={() => {
        updateTipAmountCall(tipCustomAmount);
        setTipPercentage(0);
      }}

      disabled={(loading && tipLoading) || !tipCustomAmount}
      aria-label="proceed"

    >
      <ArrowForwardIosIcon />
    </Button>
  );

  const DollarTip = () => {
    return <p style={{ position: 'absolute', left: '8px' }}>$</p>;
  };

  const IconCoupon = () => (
    <Button
      onClick={() => updateCouponCodeCall(couponCode)}
      style={{
        
        fontSize:
          basket && basket.coupon && basket.coupon.couponcode
            ? '8px'
            : '0.875rem',
      }}
      disabled={(loading && couponLoading) || !couponCode}
      aria-label="proceed"
    >
      {basket && basket.coupon && basket.coupon.couponcode ? (
        <>Remove</>
      ) : (
        <ArrowForwardIosIcon />
      )}
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
              <Typography variant="h2">TIP</Typography>
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
                      sx={{backgroundColor: "#062C43 !important"}}
                    >
                      10%
                    </ToggleButton>
                    {/* </Grid>
                      <Grid item xs={4} sm={4} md={3} lg={3}> */}
                    <ToggleButton
                      selected={tipPercentage === 15}
                      value={15}
                      className="selected-btn"
                      sx={{backgroundColor: "#062C43 !important"}}
                    >
                      15%
                    </ToggleButton>
                    {/* </Grid> */}
                    {/* <Grid item xs={4} sm={4} md={3} lg={3}> */}
                    <ToggleButton
                      selected={tipPercentage === 20}
                      value={20}
                      className="selected-btn"
                      sx={{backgroundColor: "#062C43 !important"}}
                    >
                      20%
                    </ToggleButton>
                    {/* </Grid>
                    </Grid> */}
                  </ToggleButtonGroup>
                </FormControl>
                <Grid item xs={12} md={10} lg={10}>
                  <TextField
                    className="action-btn mobile-field"
                    value={tipCustomAmount || ''}
                    type="text"
                    onChange={handleTipCustomAmountChange}
                    InputLabelProps={{
                      // shrink: tipCustomAmount === '' ? false : true,
                      classes: {
                        root:
                          tipCustomAmount !== '' ? 'mobile-field-label' : '',
                      },
                    }}
                    label="Edit Amount"
                    aria-label="edit amount"
                    title="Edit Amount"
                    // inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
                    InputProps={{
                      endAdornment: <IconTip />,
                      startAdornment: <DollarTip />,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          <Grid item xs={12} sm={6} md={4} lg={4} className="coupon-sec">
            <Grid container>
              <Typography variant="h2">COUPON CODE</Typography>
              <Grid item xs={12}>
                <TextField
                  className="action-btn"
                  disabled={basket && basket.coupon && basket.coupon.couponcode}
                  label="Enter Code"
                  type="text"
                  onChange={handleCouponCodeChange}
                  aria-label="Enter Code"
                  InputProps={{ endAdornment: <IconCoupon /> }}
                  title="Enter Code"
                  value={couponCode || ''}
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
