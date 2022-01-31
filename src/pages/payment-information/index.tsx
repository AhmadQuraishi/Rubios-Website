import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreditCards from '../../components/credit-cards';
import GiftCards from '../../components/gift-cards';
import LeftMenuBar from '../../components/left-menu-bar';

const PaymentInformation = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={0}
        sm={3}
        lg={2}
        sx={{ display: { xs: 'none', sm: 'grid' } }}
      >
        <LeftMenuBar />
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        lg={10}
        sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">PAYMENT INFORMATION</Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="Payment Information tabs"
            >
              <Tab aria-label="credit cards" value="1" label="CREDIT CARDS" />
              <Tab aria-label="gift cards" value="2" label="GIFT CARDS" />
            </Tabs>

            {value === '1' && <CreditCards />}
            {value === '2' && <GiftCards />}
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ display: { xs: 'flex', sm: 'none' } }}>back</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentInformation;
