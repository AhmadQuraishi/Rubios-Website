import React, { useEffect, useState } from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreditCards from '../../components/credit-cards';
import GiftCards from '../../components/gift-cards';
import { makeStyles } from '@mui/styles';
import { getAllBillingAccounts } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/page-title';

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
      fontSize: '22px !important',
    },
  },

  tabspanel: {
    fontFamily: "'grit_sansbold' !important",
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
  const [runOnce, setRunOnce] = React.useState(true);
  const [billingAccounts, setBillingAccounts] = useState([]);
  const { userBillingAccounts, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    if (userBillingAccounts) {
      setBillingAccounts(userBillingAccounts.billingaccounts);
    }
  }, [userBillingAccounts, loading]);

  useEffect(() => {
    if (runOnce) {
      dispatch(getAllBillingAccounts());
      setRunOnce(false);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Page title={'Payment Information'} className="">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heading} sx={{fontFamily: "'grit_sansbold' !important"}}>
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
          {value === '1' && (
            <CreditCards billingAccounts={billingAccounts} loading={loading} />
          )}
          {value === '2' && (
            <GiftCards billingAccounts={billingAccounts} loading={loading} />
          )}
        </Grid>
      </Grid>
    </Page>
  );
};

export default PaymentInformation;
