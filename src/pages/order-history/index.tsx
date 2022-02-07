import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OrderHistoryCard from '../../components/order-history-card';
import { makeStyles } from '@mui/styles';
import { boxSizing } from '@mui/system';

const useStyles = makeStyles({
  root: {
    padding: '0px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box'
  },
  heading: {
    paddingBottom: '5px',
  },
});

const OrdersHistory = () => {
  const classes = useStyles();
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
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography
          className={classes.heading}
          aria-label="your orders"
          variant="h4"
          title="your orders"
        >
          YOUR ORDERS
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
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
    </Grid>
  );
};

export default OrdersHistory;
