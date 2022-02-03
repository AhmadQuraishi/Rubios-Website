import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OrderHistoryCard from '../../components/order-history-card';

const OrdersHistory = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const favoriteOrders = [
    {
      lastOrder: '12/1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: "Amanda's Usual",
    },
    {
      lastOrder: '12/1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: "Amanda's Usual",
    },
    {
      lastOrder: '12/1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: "Amanda's Usual",
    },
    {
      lastOrder: '12/1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: "Amanda's Usual",
    },
  ];

  return (
    <Grid container>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={10} sm={10} md={9} lg={9}>
        <Typography aria-label="your orders" variant="h5" title="YOUR ORDERS">
          YOUR ORDERS
        </Typography>
        <br />
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Order History tabs"
          title="Order History tabs"
        >
          <Tab
            aria-label="favorite orders"
            value="1"
            label="FAVOTITES"
            title="favorite orders"
          />
          <Tab
            aria-label="recent orders"
            value="2"
            label="RECENT"
            title="recent orders"
          />
        </Tabs>
        <br />
        {value === '1' && <OrderHistoryCard orderHistory={favoriteOrders} />}
        {value === '2' && <OrderHistoryCard orderHistory={favoriteOrders} />}
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={2} />
    </Grid>
  );
};

export default OrdersHistory;
