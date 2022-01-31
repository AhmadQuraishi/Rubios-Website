import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LeftMenuBar from '../../components/left-menu-bar';
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
        <Box>
          <Grid container>
            <Grid item xs={1} sm={1} md={1} lg={1} />
            <Grid item xs={10} sm={10} md={9} lg={9}>
              <Typography aria-label="your orders" variant="h5">YOUR ORDERS</Typography>
              <br />
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="Order History tabs"
              >
                <Tab aria-label="favorite orders" value="1" label="FAVOTITES" />
                <Tab aria-label="recent orders" value="2" label="RECENT" />
              </Tabs>
              <br />
              {value === '1' && <OrderHistoryCard orderHistory={favoriteOrders} />}
              {value === '2' && <OrderHistoryCard orderHistory={favoriteOrders} />}
            </Grid>
            <Grid item xs={1} sm={1} md={2} lg={2} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrdersHistory;
