import React, { Fragment, useEffect } from 'react';
import { Box, Grid, Theme, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OrderHistoryCard from '../../components/order-history-card';
import { makeStyles } from '@mui/styles';
import { boxSizing } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px 20px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
  tabspanel: {
    fontWeight: '600 !important',
    color: theme.palette.secondary.main + ' !important',
  },
}));

const OrdersHistory = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [orders, setOrders] = React.useState([]);
  const dispatch = useDispatch();
  console.log('123');

  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders(authtoken));
  }, []);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      console.log(userRecentOrders.orders);
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

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
          aria-label="Order History tabs"
          title="Order History tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#79C043',
            },
          }}
        >
          <Tab
            aria-label="favorite orders"
            value="1"
            label="FAVOURITE"
            title="favourite orders"
            className={classes.tabspanel}
          />
          <Tab
            aria-label="recent orders"
            value="2"
            label="RECENT"
            title="recent orders"
            className={classes.tabspanel}
          />
        </Tabs>
        <br />
        {value === '1' && <OrderHistoryCard orderHistory={favoriteOrders} />}
        {value === '2' && <OrderHistoryCard orderHistory={favoriteOrders} />}
        {/*{value === '2' && (*/}
        {/*  <Fragment>*/}
        {/*    <h1>Recent Orders</h1>*/}
        {/*  </Fragment>*/}
        {/*)}*/}
        {/*{orders.length > 0 && (*/}
        {/*  <Fragment>*/}
        {/*    {orders.map((order: any, index) => (*/}
        {/*      <h1 key={index}>{order.timeplaced}</h1>*/}
        {/*    ))}*/}
        {/*  </Fragment>*/}
        {/*)}*/}
      </Grid>
    </Grid>
  );
};

export default OrdersHistory;
