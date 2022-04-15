import React, { useEffect } from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreditCards from '../../components/credit-cards';
import GiftCards from '../../components/gift-cards';
import { makeStyles } from '@mui/styles';
import { getAllBillingAccounts } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },

  tabspanel: {
    fontFamily: 'Poppins-Medium !important',
    fontSize: '14px !important',
    color: theme.palette.secondary.main + ' !important',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    marginRight: '40px !important',
  },
}));

const PaymentInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');

  useEffect(() => {
    dispatch(getAllBillingAccounts());
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.heading}>
          PAYMENT INFORMATION
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#79C043',
              bottom: '5px',
            },
          }}
          aria-label="Payment Information Tabs"
        >
          <Tab
            aria-label="credit cards"
            value="1"
            label="CREDIT CARDS"
            title="CREDIT CARDS"
            className={classes.tabspanel}
          />
          <Tab
            aria-label="gift cards"
            value="2"
            label="GIFT CARDS"
            title="GIFT CARDS"
            className={classes.tabspanel}
          />
        </Tabs>
        {value === '1' && <CreditCards />}
        {value === '2' && <GiftCards />}
      </Grid>
    </Grid>
  );
};

export default PaymentInformation;
