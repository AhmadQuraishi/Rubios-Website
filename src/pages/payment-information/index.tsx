import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreditCards from '../../components/credit-cards';
import GiftCards from '../../components/gift-cards';

const PaymentInformation = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Grid container>
        {/*column for space*/}
        <Grid item xs={1} sm={1} md={1} lg={1} />

        <Grid item xs={10} sm={10} md={9} lg={9}>
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

        {/*column for space*/}
        <Grid item xs={1} sm={1} md={2} lg={2} />
      </Grid>
    </Box>
  );
};

export default PaymentInformation;
